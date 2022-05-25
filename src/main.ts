import axios from 'axios'
import * as github from '@actions/github'
import * as core from '@actions/core'

const GITHUB_TOKEN: any = core.getInput('GITHUB_TOKEN')
const REPORTER_SLACK_EMAIL: any = core.getInput('REPORTER_SLACK_EMAIL')
const SLACK_AUTH_TOKEN: any = core.getInput('SLACK_AUTH_TOKEN')
const SLACK_API_URL: any = core.getInput('SLACK_API_URL')
const octokit = github.getOctokit(GITHUB_TOKEN)
const {context = {}}: any = github

async function run() {
  // fetch slack info
  try {
    const {data} = await axios.post(
      SLACK_API_URL + `?email=` + REPORTER_SLACK_EMAIL,
      {},
      {
        headers: {
          Authorization: `Bearer ${SLACK_AUTH_TOKEN}`,
          ContentType: 'application/x-www-form-urlencoded'
        }
      }
    )
    core.setOutput('reporter_id', data?.user?.id)
  } catch (err: any) {
    core.setFailed(err?.message)
  }
}

run()
