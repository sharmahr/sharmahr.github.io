import { ViteReactSSG } from "vite-react-ssg";
import routes from "./routes.jsx";
import "./styles/site.css";

export const createRoot = ViteReactSSG({ routes });
