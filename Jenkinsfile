pipeline {
    agent any

    environment {
        WS = "${WORKSPACE}"
        JOB_NAME = "${JOB_NAME}"
        IMAGE_TAG = "latest"
        // RUNNER_TAG = "ncs"
        // DOCKER_REPO_URL = "harbor.evescn.com"
        // DOCKER_REPO_ACCOUNT = "admin"
        // DOCKER_REPO_PASSWORD = "Ctg.2023"
    }

    stages {
        // stage('环境检查') {
        //     steps {
        //         sh 'docker --version'
        //     }
        // }
        // stage('拉取Git仓库代码') {
        //     options {
        //         timeout(time: 60, unit: 'MINUTES')
        //     }
        //     steps {
        //         checkout scmGit(branches: [[name: 'main']], extensions: [], userRemoteConfigs: [[credentialsId: '098a599e-fe1a-4d5b-9d59-e4117d7b24d4', url: 'http://222.212.85.162:30080/sunshine/purchasing.git']])
        //     }
        // }
        stage('通过node16-pnpm7构建项目') {
            environment {
                MAVEN_IMAGE = 'harbor.evescn.com/ncs/purchase/build:node-16-pnpm-7'
            }
            steps {
                echo "通过node-pnpm7构建项目"
                script {
                    docker.image(MAVEN_IMAGE).inside() {
                        sh ' pwd && ls -alh'
                        sh ' pnpm install --no-frozen-lockfile && pnpm run build'
                        sh 'ls'
                    }
                }
            }
        }
        // stage('通过Docker制作自定义镜像') {
        //     steps {
        //         echo "通过Docker制作自定义镜像"
        //         sh "ls -alh"
        //         sh "docker login ${DOCKER_REPO_URL} -u ${DOCKER_REPO_ACCOUNT} -p ${DOCKER_REPO_PASSWORD}"
        //         sh "docker build -t ${DOCKER_REPO_URL}/ncs/purchase/${JOB_NAME}:${IMAGE_TAG} ."

        //     }
        // }
        // stage('将自定义镜像推送到Harbor') {
        //     steps {
        //         echo "将自定义镜像推送到Harbor"
        //         sh "docker login ${DOCKER_REPO_URL} -u ${DOCKER_REPO_ACCOUNT} -p ${DOCKER_REPO_PASSWORD}"
        //         sh "docker push ${DOCKER_REPO_URL}/ncs/purchase/${JOB_NAME}:${IMAGE_TAG}"
        //         sh "docker rmi ${DOCKER_REPO_URL}/ncs/purchase/${JOB_NAME}:${IMAGE_TAG}"

        //     }
        // }
        // stage('通过Publish Over SSH通知目标服务器启动项目') {
        //     steps {
        //         echo "通过Publish Over SSH通知目标服务器启动项目"
        //         sshPublisher(publishers: [sshPublisherDesc(configName: 'shengtunTest', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: "cd /opt && ./deploy.sh ${JOB_NAME}", execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: true)])
        //     }
        // }
}
}

