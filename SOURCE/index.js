#! /usr/bin/env node
// STACK
var shell    = require('shelljs')

// CUSTOM
var _starter = require('_starter')
var json2fs  = require('_json2fs2json').json2fs

var $args = process.argv[2]

if ($args === '--create') {
  // @TODO: install git cross-platform
  shell.exec('echo REQUIREMENTS:')
  shell.exec('echo ---------------')
  var x = shell.exec('git --version')
  shell.exec('echo ---------------')
  if (x.code === 127 ) {
    console.log('=> please install "git"')
  } else {
    var $name = process.argv[3]
    if (!$name) {
      shell.exec('echo HELP:')
      shell.exec('echo ---------------')
      console.log('# please provide a name')
      console.log('$ holon --create <name>')
    } else {
      shell.exec('echo CREATE PROJECT:')
      shell.exec('echo ---------------')
      json2fs($name, _starter($name),function (error) {
        if (error) console.error(error)
        console.log('@TODO: cd into project')
        console.log('@TODO: make first git commit')
        console.log('@TODO: educate about what has been created and done by printing README.md')
      })
    }
  }
} else if ($args === '--configure') {
  // shell.exec('echo CONFIGURE HOLON:')
  // shell.exec('echo ----------------')
  // console.log('@TODO: open holon/source/')
  // console.log('@TODO: explain how to "customize" holon')
  // console.log('@TODO: explain how to "save" customizations in a fork')
  // console.log('@THINK: ... "npmgenerate?" ... ')

} else if ($args === '--add-android') {
  console.log('@TODO: check if in a holon project')
  console.log('@TODO: check & install java,ant,... (locally)')
  // https://gist.github.com/P7h/9741922
  console.log('@TODO: (re-) add android platform')

} else if ($args === '--recreate') {

  shell.exec('echo RECREATE PROJECT:')
  shell.exec('echo -----------------')
  /*
    install all dependencies again
    (see package.json)
  */
  // shell.exec('rm -rf node_modules')
  // shell.exec('npm install')
  /*
    install all targets again
    (see package.json)
  */
  // shell.exec('rm -rf target')
  // shell.exec('mkdir target')
  /*
    build gh-page again
  */
  // shell.exec('rm -rf public')
  // shell.exec('mkdir public')
  /*
    build all targets again
  */
  // shell.exec('mkdir build')
  // shell.exec('npm run build')

} else if ($args === '--update') {

  shell.exec('echo UPDATE PROJECT:')
  shell.exec('echo ---------------')
  console.log('@TODO: check for updates')

} else {
  shell.exec('echo AVAILABLE COMMANDS:')
  shell.exec('echo -------------------')
  console.log('  --help')
  // console.log('  --configure')
  console.log(    '-------------------')
  console.log('  --create')
  console.log('  --recreate')
  console.log('  --add-android')
  // console.log('  --update')
}
