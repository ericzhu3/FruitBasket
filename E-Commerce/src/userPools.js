import { CognitoUserPool } from "amazon-cognito-identity-js"

const poolData = {
    UserPoolId: "us-east-2_QeStI4Nq6",
    ClientId: "6hi8sjklt8rbj690erli710gu1"
}

export default new CognitoUserPool(poolData);