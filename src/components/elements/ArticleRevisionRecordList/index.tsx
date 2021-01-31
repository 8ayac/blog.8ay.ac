import { REPOSITORY_URL } from '@/src/constants/site';
import { ArticleChangeLog } from '@/src/types';
import styled from '@emotion/styled';
import React from 'react';
import urljoin from 'url-join';

const S = {
  Details: styled.details``,

  Summary: styled.summary`
    margin-bottom: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    outline: none;
  `,

  LogList: styled.ul`
    padding-left: 0;
    margin: 0;
  `,

  LogListItem: styled.li`
    margin-bottom: 0.75rem;
    list-style: none;
  `,

  UpdateDateTime: styled.time``,

  UpdateDescriptionSpan: styled.span`
    font-weight: bolder;
  `,

  ToGitHubCommitAnchor: styled.a``,
};

const removeGitCommitPrefix = (commitMessage: string): string => {
  return commitMessage.replace(/^:.*?:\s+/, '');
};

const getGitCommitUrl = (commitId: string): string => {
  return urljoin(REPOSITORY_URL, 'commit', commitId);
};

const LogList: React.FC<{ log: ArticleChangeLog[] }> = ({ log }) => {
  return (
    <S.LogList>
      {log.map((record) => (
        <S.LogListItem key={record.id}>
          <S.UpdateDateTime>
            {new Date(record.date).toISOString()}
          </S.UpdateDateTime>{' '}
          <S.UpdateDescriptionSpan>
            {removeGitCommitPrefix(record.description)}
          </S.UpdateDescriptionSpan>{' '}
          (
          <S.ToGitHubCommitAnchor
            href={getGitCommitUrl(record.id)}
            target="_blank"
            rel="noopener"
          >
            #{record.id}
          </S.ToGitHubCommitAnchor>{' '}
          by {record.author})
        </S.LogListItem>
      ))}
    </S.LogList>
  );
};

export const ArticleRevisionRecordList: React.FC<{
  log: ArticleChangeLog[];
}> = ({ log }) => {
  log.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (log.length < 1) return <></>;

  return (
    <>
      <S.Details open>
        <S.Summary>Revision History</S.Summary>
        <LogList log={log} />
      </S.Details>
    </>
  );
};
