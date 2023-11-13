import { apiSlice } from "../api/apiSlice";

export const teamMembersApi = apiSlice.injectEndpoints({
    endpoints: (builders) => ({
        getTeamMemberTeams: builders.query({
            query: (email) => ({
                url: `/teammembers?teamMemberEmail=${email}`,
                method: "GET",
            }),
        }),
        getTeamMemberByTeamIdAndUserEmail: builders.query({
            query: ({ teamId, email }) => ({
                url: `/teammembers?teamId=${teamId}&teamMemberEmail=${email}`,
                method: "GET",
            }),
        }),
        addMember: builders.mutation({
            query: (data) => ({
                url: "/teammembers",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useAddMemberMutation,
    useGetTeamMemberTeamsQuery,
    getTeamMemberByTeamIdAndUserEmail,
} = teamMembersApi;
