const github = {
  name: 'github',
  background: '#ffffff',
  text: '#24292f',
  textMuted: '#656d76',
  title: 'AI Factory',
  levels: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
};

const githubDark = {
  name: 'github-dark',
  background: '#0d1117',
  text: '#c9d1d9',
  textMuted: '#8b949e',
  title: 'AI Factory',
  levels: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
};

const azure = {
  name: 'azure',
  background: '#f0f6ff',
  text: '#1b1b1b',
  textMuted: '#6e6e6e',
  title: 'AI Factory \u2013 Azure',
  levels: ['#e0e8f0', '#a0c4f0', '#5098e0', '#2070c0', '#0050a0'],
};

const fabric = {
  name: 'fabric',
  background: '#faf9f8',
  text: '#323130',
  textMuted: '#8a8886',
  title: 'AI Factory \u2013 Fabric',
  levels: ['#edebe9', '#c8c6c4', '#8a8886', '#605e5c', '#323130'],
};

const themes = { github, 'github-dark': githubDark, azure, fabric };

function getTheme(name) {
  return themes[name] || themes.github;
}

module.exports = { themes, getTheme };
