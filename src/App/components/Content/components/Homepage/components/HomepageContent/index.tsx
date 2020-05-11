import plusnew, { Async, component, Props } from "@plusnew/core";
import type { RouteToParameter } from "@plusnew/router";
import articleRoute from "App/components/Content/components/Article";
import { getArticles, getTags } from "shared/api/request";
import Loader from "shared/components/Loader";
import { repeat } from "shared/util/repeat";
import homepageRoute from "../../";

const DEFAULT_LIMIT = 10;

export default component(
  __dirname,
  (Props: Props<{ parameter: RouteToParameter<typeof homepageRoute> }>) => {
    return (
      <div class="home-page">
        <div class="banner">
          <div class="container">
            <h1 class="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div class="container page">
          <div class="row">
            <Props>
              {(props) => (
                <div class="col-md-9">
                  <div class="feed-toggle">
                    <ul class="nav nav-pills outline-active">
                      <li class="nav-item">
                        <a class="nav-link disabled" href="">
                          Your Feed
                        </a>
                      </li>
                      <li class="nav-item">
                        <homepageRoute.Consumer>
                          {(homepageRouteState) => (
                            <homepageRoute.Link
                              parameter={{
                                "/": {},
                              }}
                              class={`nav-link ${
                                homepageRouteState.isActive &&
                                homepageRouteState.parameter["/"].tag ===
                                  undefined
                                  ? "active"
                                  : ""
                              }`}
                            >
                              Global Feed
                            </homepageRoute.Link>
                          )}
                        </homepageRoute.Consumer>
                      </li>
                      {props.parameter["/"].tag && (
                        <li class="nav-item">
                          <homepageRoute.Link
                            parameter={{
                              "/": {
                                tag: props.parameter["/"].tag,
                              },
                            }}
                            class="nav-link"
                            classActive="active"
                          >
                            #{props.parameter["/"].tag}
                          </homepageRoute.Link>
                        </li>
                      )}
                    </ul>
                  </div>

                  <Async
                    key={`${props.parameter["/"].tag}-${props.parameter["/"].offset}-${props.parameter["/"].limit}`}
                    pendingIndicator={
                      <div class="article-preview">
                        <Loader />
                      </div>
                    }
                    constructor={() =>
                      getArticles({
                        tag: props.parameter["/"].tag,
                        offset: props.parameter["/"].offset,
                        limit: props.parameter["/"].limit || DEFAULT_LIMIT,
                      })
                    }
                  >
                    {(result) => (
                      <>
                        {result.articles.map((article) => (
                          <div key={article.slug} class="article-preview">
                            <div class="article-meta">
                              <a href="profile.html">
                                <img src={article.author.image} />
                              </a>
                              <div class="info">
                                <a href="" class="author">
                                  {article.author.username}
                                </a>
                                <span class="date">{article.createdAt}</span>
                              </div>
                              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                                <i class="ion-heart"></i>{" "}
                                {article.favoritesCount}
                              </button>
                            </div>
                            <articleRoute.Link
                              class="preview-link"
                              parameter={{
                                "/": props.parameter["/"],
                                article: {
                                  slug: article.slug,
                                },
                              }}
                            >
                              <h1>{article.title}</h1>
                              <p>{article.body}</p>
                              <span>Read more...</span>
                              {article.tagList.length > 0 && (
                                <ul class="tag-list">
                                  {article.tagList.map((tag) => (
                                    <li
                                      key={tag}
                                      class="tag-default tag-pill tag-outline"
                                    >
                                      {tag}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </articleRoute.Link>
                          </div>
                        ))}
                        <ul class="pagination">
                          {repeat(
                            Math.ceil(
                              result.articlesCount /
                                (props.parameter["/"].limit || DEFAULT_LIMIT)
                            ),
                            (index) => {
                              const offset =
                                index *
                                  (props.parameter["/"].limit ||
                                    DEFAULT_LIMIT) || undefined;
                              return (
                                <li
                                  key={index}
                                  class={`page-item ${
                                    props.parameter["/"].offset === offset
                                      ? "active"
                                      : ""
                                  }`}
                                >
                                  <homepageRoute.Link
                                    parameter={{
                                      "/": {
                                        tag: props.parameter["/"].tag,
                                        limit: props.parameter["/"].limit,
                                        offset: offset,
                                      },
                                    }}
                                    class="page-link"
                                  >
                                    {index + 1}
                                  </homepageRoute.Link>
                                </li>
                              );
                            }
                          )}
                        </ul>
                      </>
                    )}
                  </Async>
                </div>
              )}
            </Props>
            <div class="col-md-3">
              <div class="sidebar">
                <p>Popular Tags</p>

                <div class="tag-list">
                  <Async
                    pendingIndicator={<Loader />}
                    constructor={() => getTags()}
                  >
                    {(result) =>
                      result.tags.map((tag) => (
                        <homepageRoute.Link
                          key={tag}
                          parameter={{
                            "/": {
                              tag,
                            },
                          }}
                          class="tag-pill tag-default"
                        >
                          {tag}
                        </homepageRoute.Link>
                      ))
                    }
                  </Async>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
