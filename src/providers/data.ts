import { BaseRecord, DataProvider, GetListParams, GetListResponse } from "@refinedev/core";
import { Subject } from "@/types";

export const mockSubjects: Subject[] = [
    {
        id: 1,
        code: "CS101",
        name: "Introduction to Computer Science",
        department: "CS",
        description: "An introductory course covering the fundamentals of programming and computer systems.",
        created_at: new Date().toISOString(),
    },
    {
        id: 2,
        code: "MATH201",
        name: "Calculus II",
        department: "Math",
        description: "Advanced study of integration, sequences, and series.",
        created_at: new Date().toISOString(),
    },
    {
        id: 3,
        code: "ENG105",
        name: "Creative Writing",
        department: "English",
        description: "Explore various forms of creative writing, including fiction, poetry, and creative non-fiction.",
        created_at: new Date().toISOString(),
    },
];

export const dataProvider: DataProvider = {
    getList: async <TData extends BaseRecord = BaseRecord>({ resource }: GetListParams): Promise<GetListResponse<TData>> => {
        if (resource !== 'subjects') {
            return { data: [] as TData[], total: 0 };
        }

        return {
            data: mockSubjects as unknown as TData[],
            total: mockSubjects.length,
        };
    },

    getOne: async () => {
        throw new Error("Function not present in mock data provider.");
    },

    create: async () => {
        throw new Error("Function not present in mock data provider.");
    },

    update: async () => {
        throw new Error("Function not present in mock data provider.");
    },

    deleteOne: async () => {
        throw new Error("Function not present in mock data provider.");
    },

    getApiUrl: () => {
        return "";
    },
};