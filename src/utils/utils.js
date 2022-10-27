import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};

export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResults) => accResults.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {
    console.log(err);
  }
};

export const collectFormData = (event) => {
  const allFormData = new FormData();

  for (var target of event.target) {
    if (target.name && target.value !== null && target.value !== "") {
      allFormData.append(target.name, target.value);
    }
  }

  return allFormData;
};

export const fetchCategories = async (setCategories) => {
  try {
    const { data } = await axiosReq.get("posts/categories/");
    setCategories(data);
  } catch (err) {
    console.log(err);
  }
};

export const ComponentParent = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

export const AddRemoveArrayItem = (target, data) => {
  return data.includes(target)
    ? data.filter((vals) => {
        return vals !== target;
      })
    : [...data, target];
};
