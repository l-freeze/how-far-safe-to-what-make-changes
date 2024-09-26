export type Prefecture = string;
export type City = string;
export type Street = string;
export type PostalCode = string;

export type Address = {
    prefecture: Prefecture;
    city: City;
    street: Street;
    postalCode: PostalCode;
}

export type FirstName = string;
export type LastName = string;
export type ApplicantName = {
    sei: LastName;
    mei: FirstName;
};

export type Age = number
export type ApplicantAge = Age;
export type ApplicantAddress = Address;
export type ApplicantExperience = string;
export type ApplicantSkill = string;
export type Applicant = {
    name: ApplicantName;
    age: ApplicantAge;
    address: ApplicantAddress;
    experiences: ApplicantExperience[];
    skills: ApplicantSkill[];
}

enum InterviewStage {
    FirstInterview = 1,
    SecondInterview = 2,
    FinalInterview = 3,
}

enum Result {
    Recruitment = 1,
    Rejected = 2,
}
type Rejected = {
    result: Result.Rejected;
    stage: InterviewStage;
    reason: string;
}
type Recruitment = {
    result: Result.Recruitment;
    stage: InterviewStage;
}
type ScreeningResult = Recruitment | Rejected;

type Ok = true;
type Ng = false;
type  CheckResult = Ok | Ng;
type SkillCount = number;
export class RecruitmentSelection
{

    static execute(applicant: Applicant) {
        const result1: ScreeningResult = this.#func1(applicant);
        if (result1.result === Result.Rejected) {
            console.log(`不採用理由 = ${result1.reason}`);
            return;
        }
        const result2: ScreeningResult = this.#secondInterview(applicant);
        const result3: ScreeningResult = this.#finalInterview(applicant);

        console.log(`採用結果 = ${result3.result}`);
    }

    static #func1(applicant: Applicant): ScreeningResult {
        const checkResult: CheckResult = Filterings.funcA(20, 30, applicant.age);
        console.log(`年齢制限チェック = ${checkResult}`);
        if (!checkResult) {
            return {
                result: Result.Rejected,
                stage: InterviewStage.FirstInterview,
                reason: '年齢が条件を満たしていません',
            } as Rejected;
        }

        const requiredSkills: RequiredSkills = Object.values(RequiredSkillName);
        const checkRequiredSkillsResult: CheckResult = Filterings.funcB(requiredSkills, applicant.skills);
        console.log(`必須スキルチェック = ${checkRequiredSkillsResult}`);
        if (!checkRequiredSkillsResult) {
            return {
                result: Result.Rejected,
                stage: InterviewStage.FirstInterview,
                reason: '必須スキルが足りません',
            } as Rejected;
        }

        const optionalSkills: OptionalSkills = Object.values(OptionalSkillName);
        const checkOptionalSkillsResult:SkillCount = Filterings.funcC(optionalSkills, applicant.skills);
        console.log(`歓迎スキルの個数 = ${checkOptionalSkillsResult}`);

        return {
            result: Result.Recruitment,
            stage: InterviewStage.FirstInterview,
        } as Recruitment;
    }

    static #secondInterview(applicant: Applicant): ScreeningResult {
        return {
            result: Result.Recruitment,
            stage: InterviewStage.SecondInterview,
        }
    }

    static #finalInterview(applicant: Applicant): ScreeningResult {
        return {
            result: Result.Recruitment,
            stage: InterviewStage.FinalInterview,
        }
    }

}

type LowerLimit = number;
type UpperLimit = number;

enum OptionalSkillName {
    Java = 'java',
    Python = 'python',
    Php = 'php',
    Haskell = 'haskell',
    Rust    = 'rust',
    C    = 'c',
    Csharp  = 'C#',
    Fsharp  = 'F#',
    Elixir  = 'elixir',
    Erlang  = 'erlang',
    Scala   = 'scala',
    kotlin  = 'kotlin',
    Swift   = 'swift',
    Go  = 'go',
    Aws = 'aws',
    Azure   = 'azure',
    Gcp = 'gcp',
    Docker  = 'docker',
    Kubernetes  = 'kubernetes',
    Terraform   = 'terraform',
    Ansible = 'ansible',
    Jenkins = 'jenkins',
    Github_actions  = 'github_actions',
    Heroku  = 'heroku',
    Netlify = 'netlify',
    Vercel  = 'vercel',
}
enum RequiredSkillName {
    Typescript = 'typescript',
    Html = 'html',
}
type RequiredSkills = RequiredSkillName[];
type OptionalSkills = OptionalSkillName[];

/**
 * 応募者のスキルをフィルタリングするクラス
 */
class Filterings {
    static funcA(
        lowerLimit: LowerLimit,
        upperLimit: UpperLimit,
        age: Age
    ): CheckResult {
        return age >= lowerLimit && age <= upperLimit;
    }

    /**
     * 必須スキルを持っているかを返す
     */
    static funcB(
        requiredSkills: RequiredSkills,
        personSkills: ApplicantSkill[]
    ): CheckResult {
        return requiredSkills.every((skill) => personSkills.includes(skill));
    }

    /**
     * 歓迎スキルをいくつ持っているかを返す
     */
    static funcC(
        optionalSkills: OptionalSkills,
        personSkills: ApplicantSkill[]
    ): number {
        return optionalSkills
            .filter((skill) => personSkills.includes(skill))
            .length;
    }
}