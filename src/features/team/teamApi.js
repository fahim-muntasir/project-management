import { apiSlice } from "../api/apiSlice";
import { teamMembersApi } from "../teamMembers/teamMembersApi";

export const teamApi = apiSlice.injectEndpoints({
    endpoints: (builders) => ({
        getTeam: builders.query({
            query: (email) => ({
                url: `/team`,
                method: "GET",
            }),
        }),
        createTeam: builders.mutation({
            query: ({ creator, data }) => ({
                url: "/team",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const createTeam = await queryFulfilled;
                    console.log(createTeam);
                    if (createTeam?.data?.id) {
                        const res = await dispatch(
                            teamMembersApi.endpoints.addMember.initiate({
                                teamId: createTeam.data.id,
                                teamName: createTeam.data?.teamName,
                                teamColor: createTeam.data?.color,
                                description: createTeam.data?.description,
                                teamCreationDate: createTeam.data?.timestamp,
                                teamMemberEmail: arg?.creator,
                            })
                        ).unwrap();

                        // update teamMember cache pessimistically start
                        dispatch(
                            apiSlice.util.updateQueryData(
                                "getTeamMemberTeams",
                                arg.creator,
                                (draft) => {
                                    draft.push(res);
                                }
                            )
                        );
                    }
                } catch (err) {
                    console.log(err);
                }
            },
        }),
    }),
});

export const { useGetTeamQuery, useCreateTeamMutation } = teamApi;
