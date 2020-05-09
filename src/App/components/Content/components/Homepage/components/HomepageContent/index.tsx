import plusnew, { component, Async } from "@plusnew/core";
import Loader from "shared/components/Loader";
import { getArticles, getTags } from "shared/api/request";

export default component(__dirname, () => (
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link disabled" href="">
                  Your Feed
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">
                  Global Feed
                </a>
              </li>
            </ul>
          </div>

          <Async
            pendingIndicator={<Loader />}
            constructor={() => getArticles({})}
          >
            {(result) =>
              result.articles.map((article) => (
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
                      <i class="ion-heart"></i> {article.favorited}
                    </button>
                  </div>
                  <a href="" class="preview-link">
                    <h1>{article.title}</h1>
                    <p>{article.body}</p>
                    <span>Read more...</span>
                  </a>
                </div>
              ))
            }
          </Async>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <Async pendingIndicator={null} constructor={() => getTags()}>
                {(result) =>
                  result.tags.map((tag) => (
                    <a key={tag} href="" class="tag-pill tag-default">
                      {tag}
                    </a>
                  ))
                }
              </Async>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
));
