import React from "react";
import {
  useSearchFilterSort,
  useSetSearchFilterSort,
} from "../contexts/SearchFilterSortContext";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import IconText from "./IconText";
import useBreakpoints from "../hooks/useBreakpoints";
import styles from "../styles/PostsSort.module.css";

/* An array of sort options. */
const sortValues = [
  { title: "Title", eventKey: "title" },
  { title: "Date Created", eventKey: "created_at" },
  { title: "Likes", eventKey: "likes_count" },
  { title: "Dislikes", eventKey: "dislikes_count" },
];

const PostsSort = () => {
  /* Destructuring the data from the context. */
  const { sort } = useSearchFilterSort();
  const setSearchFilterSort = useSetSearchFilterSort();
  const { md } = useBreakpoints();

  /* Function to toggle direction of sort. */
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
      {/* Sort dropdown toggle button. */}
      <Form.Label className="d-none">Post Sorting</Form.Label>
      <Dropdown.Toggle className="w-25" aria-label="Sort Menu">
        <IconText text={md && "Sort"} icon="sort" right />
      </Dropdown.Toggle>

      <Dropdown.Menu align="end">
        {/* Sort options mapped into dropdown items. */}
        {sortValues.map((option, idx) => (
          <Dropdown.Item key={idx} as="div" eventKey={option.eventKey}>
            <Row>
              <Col xs="auto">
                {/* Conditional rendering of arrow to indiciate
                current sorting. */}
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
