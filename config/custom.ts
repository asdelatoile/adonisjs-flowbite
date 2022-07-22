type CustomConfig = {
  pagination: {
    limit: number;
    field: string;
    dir: string;
  };
};

const customConfig: CustomConfig = {
  pagination: {
    field: "id",
    limit: 10, // 5 10 25 50
    dir: "asc",
  },
};

export default customConfig;
