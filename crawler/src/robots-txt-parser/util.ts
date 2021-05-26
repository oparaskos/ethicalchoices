import { RobotsGroupMemberRecord } from "./parser";

/*
 * Calculates the number of records that apply for the
 * given path and the maximum specificity of all
 * the records which apply.
 */
export function applyRecords(path: string, records: RobotsGroupMemberRecord[]) {
  let numApply = 0;
  let maxSpecificity = 0;

  for (let i = 0; i < records.length; i += 1) {
    const record = records[i];
    if (record.path.test(path)) {
      numApply += 1;
      if (record.specificity > maxSpecificity) {
        maxSpecificity = record.specificity;
      }
    }
  }

  return {
    numApply,
    maxSpecificity,
  };
}

export function isFunction(value: any) {
  return typeof value === 'function';
}

