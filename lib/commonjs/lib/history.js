import { array, discriminatedUnion, literal, number, object, string, } from "zod";
const testCoverageMetadata = object({
    type: literal("test-coverage"),
    line: number().min(0).max(100),
    statement: number().min(0).max(100),
    function: number().min(0).max(100),
    branch: number().min(0).max(100),
}).strict();
const testResultMetadata = object({
    type: literal("test-result"),
    pass: number().min(0),
    fail: number().min(0),
    skip: number().min(0),
}).strict();
const documentationMetadata = object({
    type: literal("documentation"),
}).strict();
const codeQualityMetadata = object({
    type: literal("code-quality"),
    qualityRating: string(),
}).strict();
const metadata = discriminatedUnion("type", [
    codeQualityMetadata,
    documentationMetadata,
    testCoverageMetadata,
    testResultMetadata,
]);
const input = object({
    name: string(),
    url: string().url(),
    data: metadata,
}).strict();
const inputArray = array(input);
const historyEntry = object({
    sha: string(),
    url: string(),
    action: string(),
    items: inputArray,
}).strict();
const history = array(historyEntry);
export { metadata, input, inputArray, historyEntry, history };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvaGlzdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsS0FBSyxFQUNMLGtCQUFrQixFQUNsQixPQUFPLEVBQ1AsTUFBTSxFQUNOLE1BQU0sRUFDTixNQUFNLEdBRVAsTUFBTSxLQUFLLENBQUM7QUFFYixNQUFNLG9CQUFvQixHQUFHLE1BQU0sQ0FBQztJQUNsQyxJQUFJLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQztJQUM5QixJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7SUFDOUIsU0FBUyxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0lBQ25DLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztJQUNsQyxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7Q0FDakMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRVosTUFBTSxrQkFBa0IsR0FBRyxNQUFNLENBQUM7SUFDaEMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDNUIsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDckIsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDckIsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Q0FDdEIsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRVosTUFBTSxxQkFBcUIsR0FBRyxNQUFNLENBQUM7SUFDbkMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUM7Q0FDL0IsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRVosTUFBTSxtQkFBbUIsR0FBRyxNQUFNLENBQUM7SUFDakMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUM7SUFDN0IsYUFBYSxFQUFFLE1BQU0sRUFBRTtDQUN4QixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFWixNQUFNLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUU7SUFDMUMsbUJBQW1CO0lBQ25CLHFCQUFxQjtJQUNyQixvQkFBb0I7SUFDcEIsa0JBQWtCO0NBQ25CLENBQUMsQ0FBQztBQUVILE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQztJQUNuQixJQUFJLEVBQUUsTUFBTSxFQUFFO0lBQ2QsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRTtJQUNuQixJQUFJLEVBQUUsUUFBUTtDQUNmLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVaLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUVoQyxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUM7SUFDMUIsR0FBRyxFQUFFLE1BQU0sRUFBRTtJQUNiLEdBQUcsRUFBRSxNQUFNLEVBQUU7SUFDYixNQUFNLEVBQUUsTUFBTSxFQUFFO0lBQ2hCLEtBQUssRUFBRSxVQUFVO0NBQ2xCLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVaLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztBQWVwQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgYXJyYXksXG4gIGRpc2NyaW1pbmF0ZWRVbmlvbixcbiAgbGl0ZXJhbCxcbiAgbnVtYmVyLFxuICBvYmplY3QsXG4gIHN0cmluZyxcbiAgeixcbn0gZnJvbSBcInpvZFwiO1xuXG5jb25zdCB0ZXN0Q292ZXJhZ2VNZXRhZGF0YSA9IG9iamVjdCh7XG4gIHR5cGU6IGxpdGVyYWwoXCJ0ZXN0LWNvdmVyYWdlXCIpLFxuICBsaW5lOiBudW1iZXIoKS5taW4oMCkubWF4KDEwMCksXG4gIHN0YXRlbWVudDogbnVtYmVyKCkubWluKDApLm1heCgxMDApLFxuICBmdW5jdGlvbjogbnVtYmVyKCkubWluKDApLm1heCgxMDApLFxuICBicmFuY2g6IG51bWJlcigpLm1pbigwKS5tYXgoMTAwKSxcbn0pLnN0cmljdCgpO1xuXG5jb25zdCB0ZXN0UmVzdWx0TWV0YWRhdGEgPSBvYmplY3Qoe1xuICB0eXBlOiBsaXRlcmFsKFwidGVzdC1yZXN1bHRcIiksXG4gIHBhc3M6IG51bWJlcigpLm1pbigwKSxcbiAgZmFpbDogbnVtYmVyKCkubWluKDApLFxuICBza2lwOiBudW1iZXIoKS5taW4oMCksXG59KS5zdHJpY3QoKTtcblxuY29uc3QgZG9jdW1lbnRhdGlvbk1ldGFkYXRhID0gb2JqZWN0KHtcbiAgdHlwZTogbGl0ZXJhbChcImRvY3VtZW50YXRpb25cIiksXG59KS5zdHJpY3QoKTtcblxuY29uc3QgY29kZVF1YWxpdHlNZXRhZGF0YSA9IG9iamVjdCh7XG4gIHR5cGU6IGxpdGVyYWwoXCJjb2RlLXF1YWxpdHlcIiksXG4gIHF1YWxpdHlSYXRpbmc6IHN0cmluZygpLFxufSkuc3RyaWN0KCk7XG5cbmNvbnN0IG1ldGFkYXRhID0gZGlzY3JpbWluYXRlZFVuaW9uKFwidHlwZVwiLCBbXG4gIGNvZGVRdWFsaXR5TWV0YWRhdGEsXG4gIGRvY3VtZW50YXRpb25NZXRhZGF0YSxcbiAgdGVzdENvdmVyYWdlTWV0YWRhdGEsXG4gIHRlc3RSZXN1bHRNZXRhZGF0YSxcbl0pO1xuXG5jb25zdCBpbnB1dCA9IG9iamVjdCh7XG4gIG5hbWU6IHN0cmluZygpLFxuICB1cmw6IHN0cmluZygpLnVybCgpLFxuICBkYXRhOiBtZXRhZGF0YSxcbn0pLnN0cmljdCgpO1xuXG5jb25zdCBpbnB1dEFycmF5ID0gYXJyYXkoaW5wdXQpO1xuXG5jb25zdCBoaXN0b3J5RW50cnkgPSBvYmplY3Qoe1xuICBzaGE6IHN0cmluZygpLFxuICB1cmw6IHN0cmluZygpLFxuICBhY3Rpb246IHN0cmluZygpLFxuICBpdGVtczogaW5wdXRBcnJheSxcbn0pLnN0cmljdCgpO1xuXG5jb25zdCBoaXN0b3J5ID0gYXJyYXkoaGlzdG9yeUVudHJ5KTtcblxudHlwZSBJbnB1dCA9IHouaW5mZXI8dHlwZW9mIGlucHV0PjtcbmRlY2xhcmUgbGV0IHg6IElucHV0O1xudHlwZSBNZXRhZGF0YUVudW0gPSB0eXBlb2YgeC5kYXRhLnR5cGU7XG50eXBlIElucHV0QXJyYXkgPSB6LmluZmVyPHR5cGVvZiBpbnB1dEFycmF5PjtcbnR5cGUgSGlzdG9yeUVudHJ5ID0gei5pbmZlcjx0eXBlb2YgaGlzdG9yeUVudHJ5PjtcbnR5cGUgSGlzdG9yeSA9IHouaW5mZXI8dHlwZW9mIGhpc3Rvcnk+O1xuXG50eXBlIE1ldGFkYXRhID0gei5pbmZlcjx0eXBlb2YgbWV0YWRhdGE+O1xudHlwZSBUZXN0Q292ZXJhZ2VNZXRhZGF0YSA9IHouaW5mZXI8dHlwZW9mIHRlc3RDb3ZlcmFnZU1ldGFkYXRhPjtcbnR5cGUgRG9jdW1lbnRNZXRhZGF0YSA9IHouaW5mZXI8dHlwZW9mIGRvY3VtZW50YXRpb25NZXRhZGF0YT47XG50eXBlIENvZGVRdWFsaXR5TWV0YWRhdGEgPSB6LmluZmVyPHR5cGVvZiBjb2RlUXVhbGl0eU1ldGFkYXRhPjtcbnR5cGUgVGVzdFJlc3VsdE1ldGFkYXRhID0gei5pbmZlcjx0eXBlb2YgdGVzdFJlc3VsdE1ldGFkYXRhPjtcblxuZXhwb3J0IHsgbWV0YWRhdGEsIGlucHV0LCBpbnB1dEFycmF5LCBoaXN0b3J5RW50cnksIGhpc3RvcnkgfTtcblxuZXhwb3J0IHR5cGUge1xuICBNZXRhZGF0YUVudW0sXG4gIFRlc3RDb3ZlcmFnZU1ldGFkYXRhLFxuICBEb2N1bWVudE1ldGFkYXRhLFxuICBDb2RlUXVhbGl0eU1ldGFkYXRhLFxuICBUZXN0UmVzdWx0TWV0YWRhdGEsXG4gIE1ldGFkYXRhLFxuICBJbnB1dCxcbiAgSW5wdXRBcnJheSxcbiAgSGlzdG9yeUVudHJ5LFxuICBIaXN0b3J5LFxufTtcbiJdfQ==