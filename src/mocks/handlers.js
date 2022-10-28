import { rest } from "msw";

const baseURL = process.env.REACT_APP_API_URL;

/* A mock server. */
export const handlers = [
  /* Login endpoint */
  rest.get(`${baseURL}auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 1,
        username: "admin",
        email: "admin@guideshare.com",
        first_name: "Admin",
        last_name: "Account",
        profile_id: 1,
        profile_picture:
          "https://res.cloudinary.com/binmore-cloudinary/image/upload/v1/guideshare/profiles/2/0e10192f5be11713ffaa7c298660f809_tdhmzg",
        is_admin: true,
      })
    );
  }),
  /* Logout endpoint */
  rest.post(`${baseURL}auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  /* Saved-Following get endpoint */
  rest.get(`${baseURL}saved-following/*`, (req, res, ctx) => {
    return res(
      ctx.json({
        following: [3],
        saved_posts: [1],
      })
    );
  }),
  /* Saved-Following put endpoint */
  rest.put(`${baseURL}saved-following/*`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  /* Categories endpoint */
  rest.get(`${baseURL}posts/categories/`, (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, title: "Category 1" },
        { id: 2, title: "Category 2" },
      ])
    );
  }),
];
