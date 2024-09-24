import * as Jinji from './HumanResourcesDepartment.ts';

const oubosha: Jinji.Applicant = {
    name: {
        sei: '就職',
        mei: '四太郎'
    },
    age: 30,
    address: {
        prefecture: '東京都',
        city: '港区',
        street: '六本木１−１−１',
        postalCode: '123-4567'
    },
    experiences: ['developer', 'project-manager', 'lead-engineer','tester'],
    skills: [
        'typescript',
        'html',
        'F#',
        'rust',
        'docker',
        'ansible'
    ],
}


Jinji.RecruitmentSelection.execute(oubosha);