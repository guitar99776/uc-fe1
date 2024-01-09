pipeline {
  agent any
  // {
  //   kubernetes {
  //     inheritFrom 'nodejs'
  //     containerTemplate {
  //       name 'nodejs'
  //       image 'harbor.evescn.com/public/build:node-18-pnpm-7'
  //     }
  //   }
  // }

  environment {
      HARBOR_HOST = 'harbor.evescn.com'
      HARBOR_USER_NAME = 'admin'
      HARBOR_PASSWORD = 'Ctg.2023'
      HARBOR_PATH ='ctg-hr'
      APP_NAME = 'uc-fe'
      APP_VERSION = 'latest'
   }

  parameters {
      string(name: 'PERSON', defaultValue: 'Mr Jenkins', description: 'Who should I say hello to?')
  }

  stages {
    stage('Example1') {
      input {
            message "Should we continue?"
            ok "Yes, we should."
            submitter "alice,bob"
            parameters {
                string(name: 'PERSON', defaultValue: 'Mr Jenkins', description: 'Who should I say hello to?')
            }
        }
        steps {
            echo "Hello, ${PERSON}, nice to meet you."
        }
    }
    stage('check environment') {
        steps {
            sh 'docker --version'
            sh 'echo "jenkins 传入params："'
            sh 'echo $TEST_SELECT $BUILDING_IMMEDIATELY $TEST_INPUT'
            sh "sh replace.sh $TEST_SELECT $BUILDING_IMMEDIATELY $TEST_INPUT"
        }
    }
    stage('pnpm build') {
        environment {
          BASIC_IMAGE = 'node:18-alpine'
        }
        steps {
          echo "start building~~~~~~~~~~~~~"
          script {
            //  docker.image(BASIC_IMAGE).inside() {
                sh 'pnpm install'
                sh 'pnpm run build'
                sh 'ls -l dist'
                sh 'du -sh dist' // 显示dist文件夹size
              // }
          }
        }
    }
    stage('docker build') {
      steps {
          sh "ls -alh"
          // sh 'docker login $HARBOR_HOST -u $HARBOR_USER_NAME -p $HARBOR_PASSWORD'
          sh 'docker build -t test:lastest .'
          sh 'docker image ls test'
          // sh 'docker build -t $HARBOR_HOST/$HARBOR_PATH/$APP_NAME:$APP_VERSION .'
          // sh 'docker push $HARBOR_HOST/$HARBOR_PATH/$APP_NAME:$APP_VERSION'
          // sh 'docker rmi $HARBOR_HOST/$HARBOR_PATH/$APP_NAME:$APP_VERSION'
      }
    }

    // stage('deploy k8s') {
    //     agent {
    //         node {
    //           label 'base'
    //         }
    //     }
    //     steps {
    //          container('base') {
    //               withCredentials([
    //                   kubeconfigFile(
    //                       credentialsId: 'ct-hr-dev-conf',
    //                       variable: 'KUBECONFIG')
    //                     ]) {
    //                     sh 'ls'
    //                     sh 'envsubst < k8s-devops.yaml | kubectl delete -f -'
    //                     sh 'envsubst < k8s-devops.yaml | kubectl apply -f -'
    //                 }
    //               }
    //     }
    // }

  }

  post {
    always {
      echo 'always print'
    }
    success {
      echo "成功啦，准备发送钉钉通知📢"
    }
  }
}
