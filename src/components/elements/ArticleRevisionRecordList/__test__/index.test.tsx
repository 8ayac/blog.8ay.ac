import { ArticleRevisionRecordList } from '@/src/components/elements/ArticleRevisionRecordList';
import { REPOSITORY_URL } from '@/src/constants/site';
import { theme } from '@/src/constants/theme';
import { mockArticleData } from '@/src/shared/__mocks__/articleData';
import { ArticleChangeLog } from '@/src/types';
import { ThemeProvider } from '@emotion/react';
import { mount } from 'enzyme';
import React from 'react';
import urljoin from 'url-join';

describe('ArticleRevisionRecordList', () => {
  const testLog: ArticleChangeLog[] = mockArticleData.t1.changeLogs;

  describe('is rendered correctly', () => {
    describe('to match the snapshot', () => {
      test('when the length of the log is 1 or more', () => {
        const wrapper = mount(
          <ThemeProvider theme={theme}>
            <ArticleRevisionRecordList log={testLog} />
          </ThemeProvider>
        );
        expect(wrapper).toMatchSnapshot();
      });

      test('when the length of the log is 0', () => {
        const wrapper = mount(
          <ThemeProvider theme={theme}>
            <ArticleRevisionRecordList log={[]} />
          </ThemeProvider>
        );
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('under certain conditions', () => {
      it('should not be rendered when the length of the log is 0', () => {
        const wrapper = mount(
          <ThemeProvider theme={theme}>
            <ArticleRevisionRecordList log={[]} />
          </ThemeProvider>
        );
        expect(wrapper.find('Details')).toHaveLength(0);
      });

      it('should sort the log in descending order by date', () => {
        const wrapper = mount(
          <ThemeProvider theme={theme}>
            <ArticleRevisionRecordList log={[testLog[1], testLog[0]]} />
          </ThemeProvider>
        );

        expect(wrapper.find('LogListItem')).toHaveLength(2);
        expect(wrapper.find('UpdateDateTime').at(0).text()).toBe(
          new Date(testLog[0].date).toISOString()
        );
        expect(wrapper.find('UpdateDateTime').at(1).text()).toBe(
          new Date(testLog[1].date).toISOString()
        );
      });
    });

    test('links to the detail page of the commit in GitHub properly', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <ArticleRevisionRecordList log={testLog} />
        </ThemeProvider>
      );

      expect(wrapper.find('ToGitHubCommitAnchor').at(0).prop('href')).toBe(
        urljoin(REPOSITORY_URL, 'commit', testLog[0].id)
      );
      expect(wrapper.find('ToGitHubCommitAnchor').at(1).prop('href')).toBe(
        urljoin(REPOSITORY_URL, 'commit', testLog[1].id)
      );
    });

    test("removes the prefix 'like `:thinking:` from descriptions", () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <ArticleRevisionRecordList log={testLog} />
        </ThemeProvider>
      );

      expect(wrapper.find('UpdateDescriptionSpan').first().text()).toBe(
        'this is a test commit 1-1'
      );
    });
  });

  describe('has proper style rules', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <ArticleRevisionRecordList log={testLog} />
      </ThemeProvider>
    );

    test('in Summary', () => {
      expect(wrapper.find('Summary')).toHaveStyleRule('cursor', 'pointer');
      expect(wrapper.find('Summary')).toHaveStyleRule('outline', 'none');
      expect(wrapper.find('Summary')).toHaveStyleRule(
        'margin-bottom',
        '0.75rem'
      );
      expect(wrapper.find('Summary')).toHaveStyleRule('font-weight', '600');
    });

    test('in LogList', () => {
      expect(wrapper.find('LogList')).toHaveStyleRule('padding-left', '0');
      expect(wrapper.find('LogList')).toHaveStyleRule('margin', '0');
    });

    test('in LogListItem', () => {
      expect(wrapper.find('LogListItem')).toHaveStyleRule(
        'margin-bottom',
        '0.75rem'
      );
      expect(wrapper.find('LogListItem')).toHaveStyleRule('list-style', 'none');
    });

    test('in UpdateDescriptionSpan', () => {
      expect(wrapper.find('UpdateDescriptionSpan')).toHaveStyleRule(
        'font-weight',
        'bolder'
      );
    });
  });
});
