import { useState, useEffect } from "react";
import { Calendar, Badge, List, Select, Spin, Alert } from "antd";
import moment from "moment";
import axios from "axios";
import { ArrowLeft, Globe } from "lucide-react";
import { Link } from "react-router";

const HolidayCalendar = () => {
  const [holidays, setHolidays] = useState([]);
  const [countryCode, setCountryCode] = useState("US");
  const [year, setYear] = useState(moment().year());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const COUNTRIES = {
    US: "United States",
    GB: "United Kingdom",
    DE: "Germany",
    FR: "France",
    JP: "Japan",
    CA: "Canada",
  };

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`
        );
        setHolidays(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch holidays. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, [countryCode, year]);

  const getHolidaysForDate = (currentDate) => {
    return holidays.filter((holiday) =>
      moment(holiday.date).isSame(currentDate, "day")
    );
  };

  const dateCellRender = (value) => {
    const holidays = getHolidaysForDate(value);
    return (
      <div className="h-full">
        {holidays.map((holiday) => (
          <div
            key={holiday.date}
            className="text-xs p-1 bg-red-100 rounded mt-1 text-red-600"
          >
            {holiday.name}
          </div>
        ))}
      </div>
    );
  };

  const monthCellRender = (value) => {
    const monthHolidays = holidays.filter((holiday) =>
      moment(holiday.date).isSame(value, "month")
    );

    return monthHolidays.length > 0 ? (
      <div className="p-2">
        <h4 className="font-semibold mb-2">Holidays this month:</h4>
        <List
          size="small"
          dataSource={monthHolidays}
          renderItem={(item) => (
            <List.Item>
              <Badge color="red" text={item.name} />
              <span className="ml-2 text-gray-500">
                {moment(item.date).format("MMM Do")}
              </span>
              <span className="ml-2 text-gray-400 text-sm">
                ({item.countryCode})
              </span>
            </List.Item>
          )}
        />
      </div>
    ) : null;
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      {/* Navigation Header */}
      <div className="mb-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>
      </div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Global Holiday Calendar
        </h2>
        <Globe className="text-indigo-600 w-5 h-5" />
      </div>

      <div className="flex gap-4 mb-6">
        <Select
          defaultValue="US"
          style={{ width: 200 }}
          onChange={(value) => setCountryCode(value)}
          options={Object.entries(COUNTRIES).map(([code, name]) => ({
            label: name,
            value: code,
          }))}
        />
        <Select
          defaultValue={year}
          style={{ width: 120 }}
          onChange={(value) => setYear(value)}
          options={Array.from({ length: 10 }, (_, i) => year - 5 + i).map(
            (y) => ({
              label: y,
              value: y,
            })
          )}
        />
      </div>

      {error && <Alert message={error} type="error" className="mb-4" />}

      <Spin spinning={loading}>
        <div className="border rounded-lg overflow-hidden">
          <Calendar
            dateCellRender={dateCellRender}
            monthCellRender={monthCellRender}
            headerRender={({ value, onChange }) => (
              <div className="p-4 flex items-center justify-between bg-gray-50">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => onChange(value.clone().subtract(1, "month"))}
                    className="px-3 py-1 hover:bg-gray-200 rounded"
                  >
                    &lt;
                  </button>
                  <span className="font-semibold">
                    {value.format("MMMM YYYY")}
                  </span>
                  <button
                    onClick={() => onChange(value.clone().add(1, "month"))}
                    className="px-3 py-1 hover:bg-gray-200 rounded"
                  >
                    &gt;
                  </button>
                </div>
                <button
                  onClick={() => onChange(moment())}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Today
                </button>
              </div>
            )}
          />
        </div>
      </Spin>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Holiday Legend</h3>
        <div className="flex gap-4">
          <div className="flex items-center">
            <Badge color="red" />
            <span className="ml-2">Public Holiday</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-500">
              (Country codes shown in monthly view)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayCalendar;
