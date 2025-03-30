import { Card, Button, Typography } from "antd";

const { Title, Text } = Typography;

const DemoBanner = () => {
  return (
    <Card
      style={{
        backgroundColor: "#fffee5",
        display: "flex",
        alignItems: "center",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <img
        src="https://static.zohocdn.com/campaign/static8/images/campaign_support.cfe80d4f3643e7d24d8b129e41ade45e.gif"
        alt="Support"
        style={{
          width: 60,
          height: 60,
          marginRight: 20,
        }}
      />
      <div style={{ flex: 1 }}>
        <Title level={4} style={{ margin: 0 }}>
          Get a personalized demo
        </Title>
        <Text>
          Connect with one of our experts to learn how our extensive feature set
          can help your business grow.
        </Text>
      </div>
      <Button
        type="primary"
        style={{ backgroundColor: "#ff7300", border: "none" }}
      >
        Schedule a Demo
      </Button>
    </Card>
  );
};

export default DemoBanner;
