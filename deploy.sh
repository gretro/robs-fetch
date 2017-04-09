echo "${TRAVIS_TAG}"
echo "${TRAVIS_BRANCH}"
if [ ${TRAVIS_TAG} ] && [ "${TRAVIS_BRANCH}" = "master" ] && [ ${NPM_TOKEN} ]
then
  docker cp robs-fetch-build:/robs-fetch ./build_result
  cd build_result
  echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> .npmrc
  npm publish
else
  echo "No publish required"
fi