const execa = require('execa');

(async () => {
  try {
    await execa('git', ['checkout', '--orphan', 'gh-pages']);
    console.log('Building...');
    await execa('yarn', ['build']);
    const folderName = 'dist';
    await execa('git', ['--work-tree', folderName, 'add', '--all']);
    await execa('git', ['--work-tree', folderName, 'commit', '-m', 'gh-pages']);
    console.log('Pushing to gh-pages...');
    await execa('git', ['push', 'origin', 'HEAD:gh-pages', '--force', '--no-verify']);
    await execa('rm', ['-r', folderName]);
    await execa('git', ['checkout', '-f', 'main']);
    await execa('git', ['branch', '-D', 'gh-pages']);
    console.log('Successfully deployed');
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
})();
