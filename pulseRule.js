const results = body;
const projectId = results[0].project.id;
const cycleId = payload["test-cycle"];


const collectionName = results[0].project.name;
const testLogs = [];

results.forEach((testCase) => {

    const featureName = testCase.test.name;

    const reportingLog = {
        exe_start_date: Date(testCase.date),
        exe_end_date: Date(testCase.date),
        module_names: [
            'API Fortress'
        ],
        name: testCase.test.name,
        automation_content: Math.floor(Math.random() * 1000000); 
    };

    const testStepLogs = [];
    order = 0;
    stepNames = [];

    const stepErrorVal = testCase.failuresCount > 0 ? "FAIL" : "PASS";
    const TCStatus = stepErrorVal

    const stepLog = {
        order: order,
        description: testCase.test.name,
        expected_result: "PASS",
        status: stepErrorVal,
        actual_result: stepErrorVal
    }
    
     testStepLogs.push(stepLog)



    reportingLog.description = "Created by API Fortress for Pulse";
    reportingLog.status = TCStatus;
    reportingLog.test_step_logs = testStepLogs;
    reportingLog.featureName = featureName;
    testLogs.push(reportingLog)
})

const formattedResults = {
    "projectId" : projectId, 
    "test-cycle" : cycleId,
    "logs" : testLogs
};

emitEvent('$YOUR_UPLOAD_TO_QTEST_EVENT_URL', formattedResults );