import { array, discriminatedUnion, object, string } from "zod";
import { anyCoveragePolicy } from "./policy/any-coverage-policy";
import { anyDeltaCoveragePolicy } from "./policy/any-delta-coverage-policy";
import { deltaCoveragePolicy } from "./policy/delta-coverage-policy";
import { minCoveragePolicy } from "./policy/min-coverage-policy";
import { maxLiteralTestPolicy } from "./policy/max-literal-test-policy";
import { minLiteralTestPolicy } from "./policy/min-literal-test-policy";
import { maxPercentageTestPolicy } from "./policy/max-percentage-test-policy";
import { minPercentageTestPolicy } from "./policy/min-percentage-test-policy";
// TODO: future implementations
// const averageCoveragePolicy = object({
//   type: literal("average-coverage-policy"),
//   warn: number().min(0).max(100),
//   fail: number().min(0).max(100),
// })
//   .required()
//   .strict();
//
// const averageDeltaCoveragePolicy = object({
//   type: literal("average-delta-coverage-policy"),
//   warn: number().min(-100).max(100),
//   fail: number().min(-100).max(100),
// })
//   .required()
//   .strict();
const policyTypes = discriminatedUnion("type", [
    anyCoveragePolicy,
    anyDeltaCoveragePolicy,
    deltaCoveragePolicy,
    minCoveragePolicy,
    maxLiteralTestPolicy,
    minLiteralTestPolicy,
    maxPercentageTestPolicy,
    minPercentageTestPolicy,
]);
const policyConfig = object({
    name: string(),
    target: string(),
    data: policyTypes,
})
    .required()
    .strict();
const policyConfigs = array(policyConfig);
export { policyConfig, policyConfigs };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcG9saWN5LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUssTUFBTSxLQUFLLENBQUM7QUFDbkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDakUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDNUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDckUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDakUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDeEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDeEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDOUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFFOUUsK0JBQStCO0FBQy9CLHlDQUF5QztBQUN6Qyw4Q0FBOEM7QUFDOUMsb0NBQW9DO0FBQ3BDLG9DQUFvQztBQUNwQyxLQUFLO0FBQ0wsZ0JBQWdCO0FBQ2hCLGVBQWU7QUFDZixFQUFFO0FBQ0YsOENBQThDO0FBQzlDLG9EQUFvRDtBQUNwRCx1Q0FBdUM7QUFDdkMsdUNBQXVDO0FBQ3ZDLEtBQUs7QUFDTCxnQkFBZ0I7QUFDaEIsZUFBZTtBQUVmLE1BQU0sV0FBVyxHQUFHLGtCQUFrQixDQUFDLE1BQU0sRUFBRTtJQUM3QyxpQkFBaUI7SUFDakIsc0JBQXNCO0lBQ3RCLG1CQUFtQjtJQUNuQixpQkFBaUI7SUFDakIsb0JBQW9CO0lBQ3BCLG9CQUFvQjtJQUNwQix1QkFBdUI7SUFDdkIsdUJBQXVCO0NBQ3hCLENBQUMsQ0FBQztBQUVILE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQztJQUMxQixJQUFJLEVBQUUsTUFBTSxFQUFFO0lBQ2QsTUFBTSxFQUFFLE1BQU0sRUFBRTtJQUNoQixJQUFJLEVBQUUsV0FBVztDQUNsQixDQUFDO0tBQ0MsUUFBUSxFQUFFO0tBQ1YsTUFBTSxFQUFFLENBQUM7QUFFWixNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7QUFLMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFycmF5LCBkaXNjcmltaW5hdGVkVW5pb24sIG9iamVjdCwgc3RyaW5nLCB6IH0gZnJvbSBcInpvZFwiO1xuaW1wb3J0IHsgYW55Q292ZXJhZ2VQb2xpY3kgfSBmcm9tIFwiLi9wb2xpY3kvYW55LWNvdmVyYWdlLXBvbGljeVwiO1xuaW1wb3J0IHsgYW55RGVsdGFDb3ZlcmFnZVBvbGljeSB9IGZyb20gXCIuL3BvbGljeS9hbnktZGVsdGEtY292ZXJhZ2UtcG9saWN5XCI7XG5pbXBvcnQgeyBkZWx0YUNvdmVyYWdlUG9saWN5IH0gZnJvbSBcIi4vcG9saWN5L2RlbHRhLWNvdmVyYWdlLXBvbGljeVwiO1xuaW1wb3J0IHsgbWluQ292ZXJhZ2VQb2xpY3kgfSBmcm9tIFwiLi9wb2xpY3kvbWluLWNvdmVyYWdlLXBvbGljeVwiO1xuaW1wb3J0IHsgbWF4TGl0ZXJhbFRlc3RQb2xpY3kgfSBmcm9tIFwiLi9wb2xpY3kvbWF4LWxpdGVyYWwtdGVzdC1wb2xpY3lcIjtcbmltcG9ydCB7IG1pbkxpdGVyYWxUZXN0UG9saWN5IH0gZnJvbSBcIi4vcG9saWN5L21pbi1saXRlcmFsLXRlc3QtcG9saWN5XCI7XG5pbXBvcnQgeyBtYXhQZXJjZW50YWdlVGVzdFBvbGljeSB9IGZyb20gXCIuL3BvbGljeS9tYXgtcGVyY2VudGFnZS10ZXN0LXBvbGljeVwiO1xuaW1wb3J0IHsgbWluUGVyY2VudGFnZVRlc3RQb2xpY3kgfSBmcm9tIFwiLi9wb2xpY3kvbWluLXBlcmNlbnRhZ2UtdGVzdC1wb2xpY3lcIjtcblxuLy8gVE9ETzogZnV0dXJlIGltcGxlbWVudGF0aW9uc1xuLy8gY29uc3QgYXZlcmFnZUNvdmVyYWdlUG9saWN5ID0gb2JqZWN0KHtcbi8vICAgdHlwZTogbGl0ZXJhbChcImF2ZXJhZ2UtY292ZXJhZ2UtcG9saWN5XCIpLFxuLy8gICB3YXJuOiBudW1iZXIoKS5taW4oMCkubWF4KDEwMCksXG4vLyAgIGZhaWw6IG51bWJlcigpLm1pbigwKS5tYXgoMTAwKSxcbi8vIH0pXG4vLyAgIC5yZXF1aXJlZCgpXG4vLyAgIC5zdHJpY3QoKTtcbi8vXG4vLyBjb25zdCBhdmVyYWdlRGVsdGFDb3ZlcmFnZVBvbGljeSA9IG9iamVjdCh7XG4vLyAgIHR5cGU6IGxpdGVyYWwoXCJhdmVyYWdlLWRlbHRhLWNvdmVyYWdlLXBvbGljeVwiKSxcbi8vICAgd2FybjogbnVtYmVyKCkubWluKC0xMDApLm1heCgxMDApLFxuLy8gICBmYWlsOiBudW1iZXIoKS5taW4oLTEwMCkubWF4KDEwMCksXG4vLyB9KVxuLy8gICAucmVxdWlyZWQoKVxuLy8gICAuc3RyaWN0KCk7XG5cbmNvbnN0IHBvbGljeVR5cGVzID0gZGlzY3JpbWluYXRlZFVuaW9uKFwidHlwZVwiLCBbXG4gIGFueUNvdmVyYWdlUG9saWN5LFxuICBhbnlEZWx0YUNvdmVyYWdlUG9saWN5LFxuICBkZWx0YUNvdmVyYWdlUG9saWN5LFxuICBtaW5Db3ZlcmFnZVBvbGljeSxcbiAgbWF4TGl0ZXJhbFRlc3RQb2xpY3ksXG4gIG1pbkxpdGVyYWxUZXN0UG9saWN5LFxuICBtYXhQZXJjZW50YWdlVGVzdFBvbGljeSxcbiAgbWluUGVyY2VudGFnZVRlc3RQb2xpY3ksXG5dKTtcblxuY29uc3QgcG9saWN5Q29uZmlnID0gb2JqZWN0KHtcbiAgbmFtZTogc3RyaW5nKCksXG4gIHRhcmdldDogc3RyaW5nKCksXG4gIGRhdGE6IHBvbGljeVR5cGVzLFxufSlcbiAgLnJlcXVpcmVkKClcbiAgLnN0cmljdCgpO1xuXG5jb25zdCBwb2xpY3lDb25maWdzID0gYXJyYXkocG9saWN5Q29uZmlnKTtcblxudHlwZSBQb2xpY3lDb25maWcgPSB6LmluZmVyPHR5cGVvZiBwb2xpY3lDb25maWc+O1xudHlwZSBQb2xpY3lDb25maWdzID0gei5pbmZlcjx0eXBlb2YgcG9saWN5Q29uZmlncz47XG5cbmV4cG9ydCB7IHBvbGljeUNvbmZpZywgcG9saWN5Q29uZmlncyB9O1xuZXhwb3J0IHR5cGUgeyBQb2xpY3lDb25maWdzLCBQb2xpY3lDb25maWcgfTtcbiJdfQ==