import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTeams } from '../../http/api';

function Teams() {
    const [teams, setTeams] = useState([]);
    useEffect(() => {
        if (teams.length) return;
        getTeams().then(({ data }) => setTeams(data.teams));
    });

    return (
        <div>
            <h1>Teams</h1>
            {teams.map((team, idx) => (
                <Fragment key={idx}>
                    <h2>
                        {idx + 1}: {team.name}
                    </h2>
                    {team.results.map((result, idx) => (
                        <Fragment key={idx}>
                            <h3>
                                {idx + 1}: {result.activity.question}
                            </h3>
                            <p>
                                <b>Answer: </b>
                                {result.solution}
                            </p>
                        </Fragment>
                    ))}
                </Fragment>
            ))}
            Go back <Link to="/admin">dashboard</Link>
        </div>
    );
}

export default Teams;
