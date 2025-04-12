pipeline {
    agent any
    environment {
        AZURE_CREDENTIALS_ID = 'jenkins-pipeline-sp'
        RESOURCE_GROUP = 'WebService'
        APP_SERVICE_NAME = 'Agarwal12345'
        TF_WORKING_DIR='.'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/dipeshagarwaaal/Task-Manager.git'
            }
        }
 
        stage('Terraform Init') {
            steps {
                withCredentials([azureServicePrincipal(
                    credentialsId: AZURE_CREDENTIALS_ID,
                    subscriptionIdVariable: 'ARM_SUBSCRIPTION_ID',
                    clientIdVariable: 'ARM_CLIENT_ID',
                    clientSecretVariable: 'ARM_CLIENT_SECRET',
                    tenantIdVariable: 'ARM_TENANT_ID'
                )]) {
                    bat """
                    az login --service-principal ^
                      --username %ARM_CLIENT_ID% ^
                      --password %ARM_CLIENT_SECRET% ^
                      --tenant %ARM_TENANT_ID%

                    echo "Navigating to Terraform Directory: %TF_WORKING_DIR%"
                    cd %TF_WORKING_DIR%
                    terraform init
                    """
                }
            }
        }

        stage('Terraform Plan') {
            steps {
                withCredentials([azureServicePrincipal(
                    credentialsId: AZURE_CREDENTIALS_ID,
                    subscriptionIdVariable: 'ARM_SUBSCRIPTION_ID',
                    clientIdVariable: 'ARM_CLIENT_ID',
                    clientSecretVariable: 'ARM_CLIENT_SECRET',
                    tenantIdVariable: 'ARM_TENANT_ID'
                )]) {
                    bat """
                    az login --service-principal ^
                      --username %ARM_CLIENT_ID% ^
                      --password %ARM_CLIENT_SECRET% ^
                      --tenant %ARM_TENANT_ID%

                    echo "Navigating to Terraform Directory: %TF_WORKING_DIR%"
                    cd %TF_WORKING_DIR%
                    terraform plan -out=tfplan
                    """
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                withCredentials([azureServicePrincipal(
                    credentialsId: AZURE_CREDENTIALS_ID,
                    subscriptionIdVariable: 'ARM_SUBSCRIPTION_ID',
                    clientIdVariable: 'ARM_CLIENT_ID',
                    clientSecretVariable: 'ARM_CLIENT_SECRET',
                    tenantIdVariable: 'ARM_TENANT_ID'
                )]) {
                    bat """
                    az login --service-principal ^
                      --username %ARM_CLIENT_ID% ^
                      --password %ARM_CLIENT_SECRET% ^
                      --tenant %ARM_TENANT_ID%

                    echo "Navigating to Terraform Directory: %TF_WORKING_DIR%"
                    cd %TF_WORKING_DIR%
                    terraform apply -auto-approve tfplan
                    """
                }
            }
        }

        stage('Build') {
            steps {
                bat 'npm install'
                bat 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([azureServicePrincipal(
                    credentialsId: AZURE_CREDENTIALS_ID,
                    subscriptionIdVariable: 'ARM_SUBSCRIPTION_ID',
                    clientIdVariable: 'ARM_CLIENT_ID',
                    clientSecretVariable: 'ARM_CLIENT_SECRET',
                    tenantIdVariable: 'ARM_TENANT_ID'
                )]) {
                    bat """
                    az login --service-principal ^
                      --username %ARM_CLIENT_ID% ^
                      --password %ARM_CLIENT_SECRET% ^
                      --tenant %ARM_TENANT_ID%

                    powershell Compress-Archive -Path build/* -DestinationPath build.zip -Force

                    az webapp deploy ^
                      --resource-group %RESOURCE_GROUP% ^
                      --name %APP_SERVICE_NAME% ^
                      --src-path build.zip ^
                      --type zip
                    """
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Deployment Failed!'
        }
    }
}
