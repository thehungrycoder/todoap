import _ from "lodash";
import {DateTime} from "luxon";

export const isRelativeDate = (dateString: string) => {
    return _.includes(["today", "tomorrow"], dateString);
};
export const parseStringToDate = (dateString: string) => {
    switch (dateString) {
        case "today":
            return DateTime.local();
        case "tomorrow":
            return DateTime.local().plus({day: 1});
        default:
            return DateTime.fromISO(dateString);
    }
};

export const getParsedDueDate = (dateString: string) => {
    const parsed = parseStringToDate(dateString);

    if (isRelativeDate(dateString)) {
        return parsed.endOf("day").toJSDate();
    } else {
        return parsed.toJSDate();
    }
};

export const getListFilters = (query: any) => {

    const byStatus = (status: string) => {
        return {status};
    };

    const byDueDate = (dueDate: string) => {
        const isRelative = isRelativeDate(dueDate);
        const parsed = parseStringToDate(dueDate);

        if (isRelative) {
            return {
                dueDate: {
                    $gt: parsed.startOf("day").toJSDate(),
                    $lt: parsed.endOf("day").toJSDate()
                },
                status: "pending"
            };
        } else {
            return {status: "pending", dueDate: {$lte: parsed.toJSDate()}};
        }
    };

    const overdue = () => {
        return {status: "pending", dueDate: {$lt: new Date()}};
    };

    if (query.status === "overdue") {
        return overdue();
    }

    if (query.status) {
        return byStatus(query.status);
    }

    if (query.due_date) {
        return byDueDate(query.due_date);
    }

    return {};

};
