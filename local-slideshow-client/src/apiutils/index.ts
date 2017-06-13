import io = require("socket.io-client");
import { ApiUtils, ApiUtilsClass } from "./ApiUtils";

const ApiUtils: ApiUtils = new ApiUtilsClass(io("/"));
export default ApiUtils;
