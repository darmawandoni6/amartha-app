module.exports = {
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
    'header-max-length': [2, 'always', 72],
    'header-min-length': [2, 'always', 10],
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', ['feat', 'fix', 'perf', 'ci', 'chore']],
    'subject-empty': [2, 'never'],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^([a-z]+)(?:\(([\w\-]+)\))?:\s(.+)/,
      headerCorrespondence: ['type', 'ticket_number', 'subject'],
    },
  },
  ignores: [
    (commit: string) => {
      const semanticReleasePattern = /^chore\(release\): \d+\.\d+\.\d+(\-alpha\.\d+)? \[skip ci\]/;
      const developmentReleasePattern = /^chore\(development\): \d+\.\d+\.\d+(\-dev\.\d+)? \[skip ci\]/;
      return semanticReleasePattern.test(commit) || developmentReleasePattern.test(commit);
    },
  ],
};
