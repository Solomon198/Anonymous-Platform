#### QA Automation

This were all `user-journey` test AKA e2e test are carried out for backend and fronted. Everything here is `Cypress` so when you get a hand on it you are set to go here.

###### Runing Automation

**Step One**
Make sure the `k8s` cluster is running by running `npm run start:cluster:dev` from the root directory of the monorepo. in case you encounter permission issues just add `sudo`

**Step Two**
Navigate to `cd qa-automation` and run `npx cypress open`, select browser, and e2e testing on your selections and then you can see the spec files to run.

**NOTE**
You `must` ensure project intial setup for running the cluster is setup before you can run this automations.
