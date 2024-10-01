import Addresses from "./address/Addresses";
import Educations from "./education/Educations";
import Employments from "./employment/Employments";
import Expertises from "./expertise/Expertises";
import Licenses from "./license/Licenses";
import Qualifications from "./qualification/Qualifications";
import Referees from "./referee/Referees";

export default function MemberDetails({ member }: any) {
  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-12 sm:col-span-12">
        <Addresses member={member} />
      </div>
      <div className="col-span-12 sm:col-span-12">
        <Educations member={member} />
      </div>
      <div className="col-span-12 sm:col-span-12">
        <Employments member={member} />
      </div>
      <div className="col-span-12 sm:col-span-12">
        <Expertises member={member} />
      </div>
      <div className="col-span-12 sm:col-span-12">
        <Licenses member={member} />
      </div>
      <div className="col-span-12 sm:col-span-12">
        <Qualifications member={member} />
      </div>
      <div className="col-span-12 sm:col-span-12">
        <Referees member={member} />
      </div>
    </div>
  );
}
