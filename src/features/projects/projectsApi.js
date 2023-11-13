import { apiSlice } from "../api/apiSlice";

export const projectsApi = apiSlice.injectEndpoints({
    endpoints: (builders) => ({
        getProjects: builders.query({
            query: ({ status, memberTeams }) => {
                let queryString =
                    memberTeams?.length > 0
                        ? memberTeams
                              .map((team) => `teamId=${team?.teamId}`)
                              .join("&")
                        : null;

                console.log(queryString);

                return {
                    url: `/projects?_sort=timestamp&_order=desc&projectStatus=${status}&${queryString}`,
                    method: "GET",
                };
            },
        }),
        createProject: builders.mutation({
            query: ({ data, memberTeams }) => ({
                url: "/projects",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(
                { data, memberTeams },
                { queryFulfilled, dispatch }
            ) {
                try {
                    const response = await queryFulfilled;
                    if (response?.data?.id) {
                        dispatch(
                            apiSlice.util.updateQueryData(
                                "getProjects",
                                {
                                    status: data?.projectStatus,
                                    memberTeams: memberTeams,
                                },
                                (draft) => {
                                    draft.unshift(response?.data);
                                }
                            )
                        );
                    }
                } catch (err) {}
            },
        }),
        editProject: builders.mutation({
            query: ({ id, data, status, memberTeams, currentStatus }) => ({
                url: `/projects/${id}`,
                method: "PATCH",
                body: data,
            }),
            async onQueryStarted(
                { id, data, memberTeams, currentStatus },
                { queryFulfilled, dispatch }
            ) {
                const result = dispatch(
                    apiSlice.util.updateQueryData(
                        "getProjects",
                        {
                            status: data?.projectStatus,
                            memberTeams: memberTeams,
                        },
                        (draft) => {
                            const project = draft.find(
                                (item) => item?.id == id
                            );
                            if (!project?.id) {
                                draft.unshift({
                                    ...data,
                                    id,
                                });
                            }
                        }
                    )
                );

                const result2 = dispatch(
                    apiSlice.util.updateQueryData(
                        "getProjects",
                        {
                            status: currentStatus,
                            memberTeams: memberTeams,
                        },
                        (draft) => {
                            const projectIndex = draft.findIndex(
                                (item) => item?.id == id
                            );
                            if (currentStatus !== data?.projectStatus) {
                                draft.splice(projectIndex, 1);
                            }
                        }
                    )
                );

                try {
                    await queryFulfilled;
                } catch (err) {
                    result.undo();
                    result2.undo();
                }
            },
        }),
        deleteProject: builders.mutation({
            query: ({ id, status, memberTeams }) => ({
                url: `/projects/${id}`,
                method: "DELETE",
            }),
            async onQueryStarted(
                { id, status, memberTeams },
                { queryFulfilled, dispatch }
            ) {
                const response = dispatch(
                    apiSlice.util.updateQueryData(
                        "getProjects",
                        { status, memberTeams },
                        (draft) => {
                            const projectIndex = draft.findIndex(
                                (item) => item?.id == id
                            );
                            draft.splice(projectIndex, 1);
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch (err) {
                    response.undo();
                }
            },
        }),
    }),
});

export const {
    useGetProjectsQuery,
    useCreateProjectMutation,
    useEditProjectMutation,
    useDeleteProjectMutation,
} = projectsApi;
