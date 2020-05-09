import {
  LoginUserRequest,
  MultipleArticlesResponse,
  MultipleCommentsResponse,
  NewArticleRequest,
  NewCommentRequest,
  NewUserRequest,
  ProfileResponse,
  SingleArticleResponse,
  SingleCommentResponse,
  TagsResponse,
  UpdateArticleRequest,
  UpdateUserRequest,
  UserResponse,
} from "shared/interfaces/swagger";

function request(path: string, method: string, body?: {}) {
  return fetch(`/api${path}`, {
    method: method,
    body: body ? JSON.stringify(body) : null,
  }).then((response) => response.json());
}

function buildQuery(query: { [key: string]: string | number | undefined }) {
  return Object.entries(query).reduce((accumulator, [key, value]) => {
    if (value === undefined) {
      return accumulator;
    }
    if (accumulator === "") {
      return `?${key}=${value}`;
    }
    return `${accumulator}&${key}=${value}`;
  }, "");
}

export function postLogin(body: {
  body: LoginUserRequest;
}): Promise<UserResponse> {
  return request("/users/login", "POST", body);
}
export function postUsers(body: {
  body: NewUserRequest;
}): Promise<UserResponse> {
  return request("/users", "POST", body);
}
export function getUsers(): Promise<UserResponse> {
  return request("/users", "GET");
}
export function putUsers(body: {
  body: UpdateUserRequest;
}): Promise<UserResponse> {
  return request("/users", "PUT", body);
}
export function getProfiles(path: {
  username: string;
}): Promise<ProfileResponse> {
  return request(`/profiles/${path.username}`, "GET");
}
export function postFollow(path: {
  username: string;
}): Promise<ProfileResponse> {
  return request(`/profiles/${path.username}/follow`, "POST");
}
export function deleteFollow(path: {
  username: string;
}): Promise<ProfileResponse> {
  return request(`/profiles/${path.username}/follow`, "DELETE");
}
export function getFeed(query: {
  limit?: number;
  offset?: number;
}): Promise<MultipleArticlesResponse> {
  return request(`/articles/feed${query}`, "GET");
}
export function getArticles(query: {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
}): Promise<MultipleArticlesResponse> {
  return request(`/articles${buildQuery(query)}`, "GET");
}
export function postArticles(body: {
  article: NewArticleRequest;
}): Promise<SingleArticleResponse> {
  return request("/articles", "POST", body);
}
export function getArticle(path: {
  slug: string;
}): Promise<SingleArticleResponse> {
  return request(`/articles/${path.slug}`, "GET");
}
export function putArticles(
  path: { slug: string },
  body: { article: UpdateArticleRequest }
): Promise<SingleArticleResponse> {
  return request(`/articles/${path.slug}`, "PUT", body);
}
export function deleteArticles(path: { slug: string }): Promise<void> {
  return request(`/articles/${path.slug}`, "DELETE");
}
export function getComments(path: {
  slug: string;
}): Promise<MultipleCommentsResponse> {
  return request(`/articles/${path.slug}/comments`, "GET");
}
export function postComments(
  path: { slug: string },
  body: { comment: NewCommentRequest }
): Promise<SingleCommentResponse> {
  return request(`/articles/${path.slug}/comments`, "POST", body);
}
export function deleteComments(path: {
  slug: string;
  id: number;
}): Promise<void> {
  return request(`/articles/${path.slug}/comments/${path.id}`, "DELETE");
}
export function postFavorite(path: {
  slug: string;
}): Promise<SingleArticleResponse> {
  return request(`/articles/${path.slug}/favorite`, "POST");
}
export function deleteFavorite(path: {
  slug: string;
}): Promise<SingleArticleResponse> {
  return request(`/articles/${path.slug}/favorite`, "DELETE");
}
export function getTags(): Promise<TagsResponse> {
  return request("/tags", "GET");
}
