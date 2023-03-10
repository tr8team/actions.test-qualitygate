class BasicQualityGateService {
    #factory;
    #policyEngine;
    #io;
    #log;
    emoji(r) {
        switch (r) {
            case "pass":
                return "✅";
            case "fail":
                return "❌";
            case "warn":
                return "⚠️";
            default:
                return "";
        }
    }
    printOutput(current) {
        this.#log.info(`${current.name}, Quality Gate:`);
        this.#log.info(`  Final Result: ${this.emoji(current.data.result)} ${current.data.result}`);
        this.#log.info(`  Policies:`);
        for (const p of current.data.resultDetails.pass) {
            this.#log.info(`    ${this.emoji("pass")} ${p}`);
        }
        for (const p of current.data.resultDetails.warn) {
            this.#log.info(`    ${this.emoji("warn")} ${p}`);
        }
        for (const p of current.data.resultDetails.fail) {
            this.#log.info(`    ${this.emoji("fail")} ${p}`);
        }
    }
    async audit(input) {
        const policies = input.policies.map((policy) => this.#factory.generate(policy));
        const current = await this.#policyEngine.evaluate(policies, input.current, input.base);
        const history = await Promise.all(input.history.map((entry) => this.#policyEngine.evaluate(policies, entry, input.base)));
        // Evaluate policy here
        if (current.items.some((x) => x.data.result === "fail")) {
            this.#io.setFail("Quality Gate Failed");
        }
        // log to console here
        for (const x of current.items) {
            this.printOutput(x);
        }
        return {
            current,
            history,
        };
    }
    constructor(factory, policyEngine, io, log) {
        this.#factory = factory;
        this.#policyEngine = policyEngine;
        this.#io = io;
        this.#log = log;
    }
}
export { BasicQualityGateService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFXQSxNQUFNLHVCQUF1QjtJQUNsQixRQUFRLENBQWdCO0lBQ3hCLGFBQWEsQ0FBZTtJQUU1QixHQUFHLENBQVc7SUFFZCxJQUFJLENBQVU7SUFFdkIsS0FBSyxDQUFDLENBQWU7UUFDbkIsUUFBUSxDQUFDLEVBQUU7WUFDVCxLQUFLLE1BQU07Z0JBQ1QsT0FBTyxHQUFHLENBQUM7WUFDYixLQUFLLE1BQU07Z0JBQ1QsT0FBTyxHQUFHLENBQUM7WUFDYixLQUFLLE1BQU07Z0JBQ1QsT0FBTyxJQUFJLENBQUM7WUFDZDtnQkFDRSxPQUFPLEVBQUUsQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLGlCQUFpQixDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ1osbUJBQW1CLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFDaEQsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUNmLEVBQUUsQ0FDSCxDQUFDO1FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDOUIsS0FBSyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUU7WUFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDbEQ7UUFDRCxLQUFLLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRTtZQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNsRDtRQUNELEtBQUssTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFO1lBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2xEO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBa0I7UUFDNUIsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUM3QyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FDL0IsQ0FBQztRQUVGLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQy9DLFFBQVEsRUFDUixLQUFLLENBQUMsT0FBTyxFQUNiLEtBQUssQ0FBQyxJQUFJLENBQ1gsQ0FBQztRQUNGLE1BQU0sT0FBTyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FDL0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FDekQsQ0FDRixDQUFDO1FBRUYsdUJBQXVCO1FBQ3ZCLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxFQUFFO1lBQ3ZELElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7U0FDekM7UUFDRCxzQkFBc0I7UUFDdEIsS0FBSyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDckI7UUFDRCxPQUFPO1lBQ0wsT0FBTztZQUNQLE9BQU87U0FDUixDQUFDO0lBQ0osQ0FBQztJQUVELFlBQ0UsT0FBc0IsRUFDdEIsWUFBMEIsRUFDMUIsRUFBWSxFQUNaLEdBQVk7UUFFWixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQztRQUNsQyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO0lBQ2xCLENBQUM7Q0FDRjtBQUVELE9BQU8sRUFBc0IsdUJBQXVCLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbklucHV0IH0gZnJvbSBcIi4vaW50ZXJmYWNlL2lucHV0LXJldHJpZXZlclwiO1xuaW1wb3J0IHsgT3V0cHV0LCBPdXRwdXRFbGVtZW50LCBQb2xpY3lSZXN1bHQgfSBmcm9tIFwiLi9vdXRwdXRcIjtcbmltcG9ydCB7IFBvbGljeUZhY3RvcnkgfSBmcm9tIFwiLi9pbnRlcmZhY2UvcG9saWN5LWZhY3RvcnlcIjtcbmltcG9ydCB7IFBvbGljeUVuZ2luZSB9IGZyb20gXCIuL2ludGVyZmFjZS9wb2xpY3ktZW5naW5lXCI7XG5pbXBvcnQgeyBBY3Rpb25JTyB9IGZyb20gXCIuL2ludGVyZmFjZS9pb1wiO1xuaW1wb3J0IHsgSUxvZ2dlciB9IGZyb20gXCIuL2ludGVyZmFjZS9sb2dnZXJcIjtcblxuaW50ZXJmYWNlIFF1YWxpdHlHYXRlU2VydmljZSB7XG4gIGF1ZGl0KGlucHV0OiBBY3Rpb25JbnB1dCk6IFByb21pc2U8T3V0cHV0Pjtcbn1cblxuY2xhc3MgQmFzaWNRdWFsaXR5R2F0ZVNlcnZpY2UgaW1wbGVtZW50cyBRdWFsaXR5R2F0ZVNlcnZpY2Uge1xuICByZWFkb25seSAjZmFjdG9yeTogUG9saWN5RmFjdG9yeTtcbiAgcmVhZG9ubHkgI3BvbGljeUVuZ2luZTogUG9saWN5RW5naW5lO1xuXG4gIHJlYWRvbmx5ICNpbzogQWN0aW9uSU87XG5cbiAgcmVhZG9ubHkgI2xvZzogSUxvZ2dlcjtcblxuICBlbW9qaShyOiBQb2xpY3lSZXN1bHQpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAocikge1xuICAgICAgY2FzZSBcInBhc3NcIjpcbiAgICAgICAgcmV0dXJuIFwi4pyFXCI7XG4gICAgICBjYXNlIFwiZmFpbFwiOlxuICAgICAgICByZXR1cm4gXCLinYxcIjtcbiAgICAgIGNhc2UgXCJ3YXJuXCI6XG4gICAgICAgIHJldHVybiBcIuKaoO+4j1wiO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICB9XG5cbiAgcHJpbnRPdXRwdXQoY3VycmVudDogT3V0cHV0RWxlbWVudCk6IHZvaWQge1xuICAgIHRoaXMuI2xvZy5pbmZvKGAke2N1cnJlbnQubmFtZX0sIFF1YWxpdHkgR2F0ZTpgKTtcbiAgICB0aGlzLiNsb2cuaW5mbyhcbiAgICAgIGAgIEZpbmFsIFJlc3VsdDogJHt0aGlzLmVtb2ppKGN1cnJlbnQuZGF0YS5yZXN1bHQpfSAke1xuICAgICAgICBjdXJyZW50LmRhdGEucmVzdWx0XG4gICAgICB9YFxuICAgICk7XG4gICAgdGhpcy4jbG9nLmluZm8oYCAgUG9saWNpZXM6YCk7XG4gICAgZm9yIChjb25zdCBwIG9mIGN1cnJlbnQuZGF0YS5yZXN1bHREZXRhaWxzLnBhc3MpIHtcbiAgICAgIHRoaXMuI2xvZy5pbmZvKGAgICAgJHt0aGlzLmVtb2ppKFwicGFzc1wiKX0gJHtwfWApO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHAgb2YgY3VycmVudC5kYXRhLnJlc3VsdERldGFpbHMud2Fybikge1xuICAgICAgdGhpcy4jbG9nLmluZm8oYCAgICAke3RoaXMuZW1vamkoXCJ3YXJuXCIpfSAke3B9YCk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgcCBvZiBjdXJyZW50LmRhdGEucmVzdWx0RGV0YWlscy5mYWlsKSB7XG4gICAgICB0aGlzLiNsb2cuaW5mbyhgICAgICR7dGhpcy5lbW9qaShcImZhaWxcIil9ICR7cH1gKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBhdWRpdChpbnB1dDogQWN0aW9uSW5wdXQpOiBQcm9taXNlPE91dHB1dD4ge1xuICAgIGNvbnN0IHBvbGljaWVzID0gaW5wdXQucG9saWNpZXMubWFwKChwb2xpY3kpID0+XG4gICAgICB0aGlzLiNmYWN0b3J5LmdlbmVyYXRlKHBvbGljeSlcbiAgICApO1xuXG4gICAgY29uc3QgY3VycmVudCA9IGF3YWl0IHRoaXMuI3BvbGljeUVuZ2luZS5ldmFsdWF0ZShcbiAgICAgIHBvbGljaWVzLFxuICAgICAgaW5wdXQuY3VycmVudCxcbiAgICAgIGlucHV0LmJhc2VcbiAgICApO1xuICAgIGNvbnN0IGhpc3RvcnkgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIGlucHV0Lmhpc3RvcnkubWFwKChlbnRyeSkgPT5cbiAgICAgICAgdGhpcy4jcG9saWN5RW5naW5lLmV2YWx1YXRlKHBvbGljaWVzLCBlbnRyeSwgaW5wdXQuYmFzZSlcbiAgICAgIClcbiAgICApO1xuXG4gICAgLy8gRXZhbHVhdGUgcG9saWN5IGhlcmVcbiAgICBpZiAoY3VycmVudC5pdGVtcy5zb21lKCh4KSA9PiB4LmRhdGEucmVzdWx0ID09PSBcImZhaWxcIikpIHtcbiAgICAgIHRoaXMuI2lvLnNldEZhaWwoXCJRdWFsaXR5IEdhdGUgRmFpbGVkXCIpO1xuICAgIH1cbiAgICAvLyBsb2cgdG8gY29uc29sZSBoZXJlXG4gICAgZm9yIChjb25zdCB4IG9mIGN1cnJlbnQuaXRlbXMpIHtcbiAgICAgIHRoaXMucHJpbnRPdXRwdXQoeCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBjdXJyZW50LFxuICAgICAgaGlzdG9yeSxcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZmFjdG9yeTogUG9saWN5RmFjdG9yeSxcbiAgICBwb2xpY3lFbmdpbmU6IFBvbGljeUVuZ2luZSxcbiAgICBpbzogQWN0aW9uSU8sXG4gICAgbG9nOiBJTG9nZ2VyXG4gICkge1xuICAgIHRoaXMuI2ZhY3RvcnkgPSBmYWN0b3J5O1xuICAgIHRoaXMuI3BvbGljeUVuZ2luZSA9IHBvbGljeUVuZ2luZTtcbiAgICB0aGlzLiNpbyA9IGlvO1xuICAgIHRoaXMuI2xvZyA9IGxvZztcbiAgfVxufVxuXG5leHBvcnQgeyBRdWFsaXR5R2F0ZVNlcnZpY2UsIEJhc2ljUXVhbGl0eUdhdGVTZXJ2aWNlIH07XG4iXX0=