import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

/**
 * It takes a data object, decodes the refresh token, and sets the refresh token
 * timestamp in local storage.
 * @param data - the response from the server
 */
export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

/**
 * It removes the timestamp from local storage.
 */
export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};

/**
 * If the refreshTokenTimestamp exists in localStorage, return true, otherwise
 * return false.
 * @returns A boolean value.
 */
export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

/**
 * It takes in a resource object, and a setResource function, and then it makes an
 * axios request to the resource.next url, and then it sets the resource object to
 * the new data, and then it returns the new resource object.
 * @param resource - the resource object that contains the next url and the results
 * array
 * @param setResource - a function that sets the resource state
 */
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

/**
 * It takes a form event and returns a FormData object with all the form data.
 * @param event - The event object that is passed to the event handler.
 * @returns A FormData object.
 */
export const collectFormData = (event) => {
  const allFormData = new FormData();

  for (var target of event.target) {
    if (target.name && target.value !== null && target.value !== "") {
      allFormData.append(target.name, target.value);
    }
  }

  return allFormData;
};

/**
 * It fetches the categories from the database and sets the state of the categories
 * in the parent component.
 * @param setCategories - a function that sets the state of categories
 */
export const fetchCategories = async (setCategories) => {
  try {
    const { data } = await axiosReq.get("posts/categories/");
    setCategories(data);
  } catch (err) {
    console.log(err);
  }
};

/**
 * It takes a condition, a wrapper function, and some children, and if the
 * condition is true, it wraps the children in the wrapper function.
 */
export const ComponentParent = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

/**
 * If the target is in the array, remove it, otherwise add it.
 * @param target - The value you want to add or remove from the array.
 * @param data - The array you want to add or remove from
 * @returns a new array.
 */
export const AddRemoveArrayItem = (target, data) => {
  return data.includes(target)
    ? data.filter((vals) => {
        return vals !== target;
      })
    : [...data, target];
};
