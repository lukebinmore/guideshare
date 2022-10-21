import React from "react";
import { Col, Dropdown, Form, Row } from "react-bootstrap";
import {
  useSearchFilterSort,
  useSetSearchFilterSort,
} from "../contexts/searchFilterSortContext";
import IconText from "./IconText";
import useBreakpoints from "../hooks/useBreakpoints";
import styles from "../styles/PostsSort.module.css";

const sortValues = [
  { title: "Title", eventKey: "title" },
  { title: "Date Created", eventKey: "created_at" },
  { title: "Likes", eventKey: "likes_count" },
  { title: "Dislikes", eventKey: "dislikes_count" },
];

const PostsSort = () => {
  const { sort } = useSearchFilterSort();
  const setSearchFilterSort = useSetSearchFilterSort();
  const { md } = useBreakpoints();

  const handleChange = (event) => {
    const newOrder = () => {
      if (sort === event) {
        return "-" + event;
      } else if (sort === "-" + event) {
        return event;
      } else {
        return event;
      }
    };

    setSearchFilterSort((prevData) => ({ ...prevData, sort: newOrder() }));
  };

  return (
    <Dropdown drop="down" align="end" onSelect={handleChange}>
      <Form.Label className="d-none">Post Sorting</Form.Label>
      <Dropdown.Toggle className="w-25">
        <IconText text={md && "Sort"} icon="sort" right />
      </Dropdown.Toggle>

      <Dropdown.Menu align="end">
        {sortValues.map((option, idx) => (
          <Dropdown.Item key={idx} as="div" eventKey={option.eventKey}>
            <Row>
              <Col xs="auto">
                {sort.includes(option.eventKey) && (
                  <i
                    className={`${styles.DirectionIcon} p-1 fa-solid fa-${
                      sort.includes("-") ? "angle-down" : "angle-up"
                    }`}
                  />
                )}
              </Col>
              <Col className="text-end">
                <p className="m-0 p-1">{option.title}</p>
              </Col>
            </Row>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default PostsSort;
