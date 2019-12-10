import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_MEMBERDATA } from '../../util/queries';

import './DaoCard.scss';
import { Web3Context } from '../../contexts/ContractContexts';

const DaoCard = props => {
  const { dao } = props;
  const [web3Service] = useContext(Web3Context);

  const { loading, error, data } = useQuery(GET_MEMBERDATA, {
    variables: { contractAddr: dao.moloch },
  });

  const bankValue = value => {
    const amt = web3Service.fromWei(value);
    return parseFloat(amt).toFixed(2);
  };

  const randoColor = () => {
    const colors = [
      //'#513E97',
      '#0E99C4',
      '#4EBD9E',
      '#EA8923',
      '#F05F61'
    ]
    return colors[Math.floor(Math.random()*colors.length)];
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error - use mainnet :(</p>;

  return (
    <>
      {dao.id ? (
        <div className="DaoCard" style={{backgroundColor: randoColor()}}>
          <h4 className="DaoName">{dao.apiData.name || dao.title}</h4>
          <p>{dao.apiData.description}</p>
          <div className="Row">
            <div className="Column">
              <p className="Label">Bank</p>
              <p className="Data">
                {bankValue(dao.tokenInfo.guildBankValue)} {dao.tokenInfo.symbol}
              </p>
            </div>
            <div className="Column">
              <p className="Label">Members</p>
              <p className="Data">
                {dao.apiData.legacyData
                  ? dao.apiData.legacyData.members.length
                  : data.members.length}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p>LOADING THE DAOs</p>
      )}
    </>
  );
};

export default DaoCard;
