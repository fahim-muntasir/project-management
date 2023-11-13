import React from "react";
import { useSelector } from "react-redux";
import { useGetTeamMemberTeamsQuery } from "../../features/teamMembers/teamMembersApi";
import Error from "../Error";
import Blank from "./Blank";
import TeamItem from "./TeamItem";

export default function TeamItems() {
    const { user } = useSelector((state) => state.auth);
    const {
        data: teamMemberTeams,
        isLoading,
        isError,
        error,
    } = useGetTeamMemberTeamsQuery(user?.email) || {};

    let content = null;

    if (isError && error?.data) content = <Error message={error?.data} />;

    if (!isError && teamMemberTeams?.length === 0)
        content = <Error message="Your team is Empty!" />;

    if (isLoading)
        content = (
            <>
                <Blank /> <Blank /> <Blank />
            </>
        );

    if (!isError && teamMemberTeams?.length > 0) {
        content = teamMemberTeams.map((team) => (
            <TeamItem key={team?.id} teamData={team} />
        ));
    }

    return content;
}
