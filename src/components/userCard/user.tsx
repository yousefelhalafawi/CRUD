import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import styles from "./UserCard.module.css";
const { Meta } = Card;

interface UserCardProps {
  imageSrc: string;
  title: string;
  onClick: () => void;
  id: string;
  ssn: number;

  onDelete: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  imageSrc,
  title,
  onClick,
  id,
  onDelete,
  ssn,
}) => {
  return (
    <Card
      className={styles.card}
      actions={[
        <EditOutlined key="edit" onClick={onClick} />,
        <DeleteOutlined key="delete" onClick={onDelete} />,
      ]}
    >
      <Meta
        avatar={
          <Avatar src={imageSrc} style={{ backgroundColor: "#ed6e3e" }} />
        }
        title={title}
        description={`SSN:${ssn}`}
      />
    </Card>
  );
};

export default React.memo(UserCard);
