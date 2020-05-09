import plusnew, { component } from "@plusnew/core";
import homepageRoute from "App/components/Content/components/Homepage";
export default component(__dirname, () => (
  <nav class="navbar navbar-light">
    <div class="container">
      <homepageRoute.Link class="navbar-brand" parameter={{ "/": {} }}>
        conduit
      </homepageRoute.Link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <homepageRoute.Link
            class="nav-link"
            classActive="active"
            parameter={{ "/": {} }}
          >
            Home
          </homepageRoute.Link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="">
            <i class="ion-compose"></i>&nbsp;New Post
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="">
            Sign up
          </a>
        </li>
      </ul>
    </div>
  </nav>
));
