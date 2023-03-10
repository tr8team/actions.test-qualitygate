import { literal, union } from "zod";
const coverageMetric = union([
    literal("line"),
    literal("function"),
    literal("branch"),
    literal("statement"),
]);
const testMetric = union([literal("pass"), literal("fail"), literal("skip")]);
export { coverageMetric, testMetric };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW51bXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2VudW1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRXJDLE1BQU0sY0FBYyxHQUFHLEtBQUssQ0FBQztJQUMzQixPQUFPLENBQUMsTUFBTSxDQUFDO0lBQ2YsT0FBTyxDQUFDLFVBQVUsQ0FBQztJQUNuQixPQUFPLENBQUMsUUFBUSxDQUFDO0lBQ2pCLE9BQU8sQ0FBQyxXQUFXLENBQUM7Q0FDckIsQ0FBQyxDQUFDO0FBQ0gsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRTlFLE9BQU8sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsaXRlcmFsLCB1bmlvbiB9IGZyb20gXCJ6b2RcIjtcblxuY29uc3QgY292ZXJhZ2VNZXRyaWMgPSB1bmlvbihbXG4gIGxpdGVyYWwoXCJsaW5lXCIpLFxuICBsaXRlcmFsKFwiZnVuY3Rpb25cIiksXG4gIGxpdGVyYWwoXCJicmFuY2hcIiksXG4gIGxpdGVyYWwoXCJzdGF0ZW1lbnRcIiksXG5dKTtcbmNvbnN0IHRlc3RNZXRyaWMgPSB1bmlvbihbbGl0ZXJhbChcInBhc3NcIiksIGxpdGVyYWwoXCJmYWlsXCIpLCBsaXRlcmFsKFwic2tpcFwiKV0pO1xuXG5leHBvcnQgeyBjb3ZlcmFnZU1ldHJpYywgdGVzdE1ldHJpYyB9O1xuIl19