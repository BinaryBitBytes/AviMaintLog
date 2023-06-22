import fs from 'fs';

const ManagerData= [
    {
        "id":1,
        "managerName": "Todd Anderson",
        "isAdmin": "True",
        "onProject": "Smoke Detector Modification",
        "email": "t.anderson@man.net",
        "userName": "BigTodd",
        "password": "Anderson1"
    },
    {
        "id":2,
        "managerName": "Richard Slick",
        "isAdmin": "True",
        "onProject": "Wifi Module Modification",
        "email": "r.slick@man.net",
        "userName": "SlickRick",
        "password": "SlipNSlide"
    },
    {
        "id":3,
        "managerName": "Cindy Lefthook",
        "isAdmin": "True",
        "onProject": "Flight Control Radar Maintinence",
        "email": "c.lefthook@man.net",
        "userName": "OleLefty",
        "password": "RightHandWoman"
    },
    {
        "id":4,
        "managerName": "Andy Red",
        "isAdmin": "True",
        "onProject": "Fuel Tank Upgrade Modification",
        "email": "a.red@man.net",
        "userName": "RedVsBlue",
        "password": "IloveGreen"
    },
    {
        "id":5,
        "managerName": "Jason Lee",
        "isAdmin": "True",
        "onProject": "Air Frame Reinforcement Maintinence",
        "email": "j.lee@man.net",
        "userName": "ProSkater",
        "password": "Sk84L1f3"
    }
]

export const Manager_jsonString = JSON.stringify(ManagerData, null, 2);

fs.writeFile('managerData.json', Manager_jsonString, 'utf8', (err) => {
    if (err) {
        console.error('Error writing JSON file:', err);
    }
    console.log('JSON file has been exported')
})

export default ManagerData