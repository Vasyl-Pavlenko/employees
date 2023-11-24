import { Button, Result, Row } from "antd";
import { Link, useParams } from "react-router-dom";

const Statuses: Record<string, string> = {
  created: "Congratulations! Your account has been successfully created.",
  updated: "Great news! Your user information has been successfully updated.",
  deleted: "Success! The user has been successfully removed.",
};

export const Status = () => {
  const { status } = useParams();

  return (
    <Row
      align="middle"
      justify="center"
      style={{width: "100%"}}
    >
      <Result
        status={status ? 'success' : 404}
        title={status ? Statuses[status] : "Oops! It seems we couldn't find what you're looking for. Please check your input or try something else."}
        extra={
          <Button key="dashboard">
            <Link to="/">
              Main Menu
            </Link>
          </Button>
        }
      />
    </Row>
  );
};
