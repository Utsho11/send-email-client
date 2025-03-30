import CountUp from "react-countup";
import PropTypes from "prop-types";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const StatsCard = ({
  title,
  count,
  icon: Icon,
  color = "indigo",
  trend = 0,
}) => {
  const trendPositive = trend >= 0;
  const trendColor = trendPositive ? "text-green-600" : "text-red-600";
  const bgGradient = `bg-gradient-to-b from-${color}-100 to-white`;

  return (
    <div
      className={`group p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 ${bgGradient} hover:-translate-y-1`}
      role="region"
      aria-label={`Statistics card for ${title}`}
    >
      <div className="flex flex-col space-y-4">
        {/* Icon with background */}
        <div
          className={`w-14 h-14 rounded-xl bg-${color}-100 flex items-center justify-center`}
        >
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="flex items-end space-x-2">
            <CountUp
              end={count}
              duration={2.5}
              className="text-3xl font-bold text-gray-900"
              separator=","
            />
          </div>
        </div>

        {/* Trend indicator */}
        {trend !== 0 && (
          <div className={`flex items-center space-x-1 text-sm ${trendColor}`}>
            {trendPositive ? (
              <ArrowUpRight className="w-4 h-4" />
            ) : (
              <ArrowDownRight className="w-4 h-4" />
            )}
            <span>
              {Math.abs(trend)}% {trendPositive ? "increase" : "decrease"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.oneOf(["indigo", "emerald", "rose", "amber"]),
  trend: PropTypes.number,
};

export default StatsCard;
