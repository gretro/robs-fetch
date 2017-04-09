if [ ${TRAVIS_TAG} ] && [ ${NPM_TOKEN} ]
then
  docker cp robs-fetch-build:/robs-fetch ./build_result
  cd build_result
  echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> .npmrc
  npm version --no-git-tag-version "${TRAVIS_TAG}"
  if [ ${TRAVIS} ]
  then
    npm publish
  fi
fi