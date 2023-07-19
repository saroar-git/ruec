import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import logo from '/logo.png';

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createUser, updateUserProfile, logout } = useAuth();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const phone = form.phone.value;
    const department = form.department.value;
    const session = form.session.value;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then(result => {
        const createdUser = result.user;
        console.log(createdUser);

        updateUserProfile(name, photo)
          .then(() => {
            const saveUser = { name: name, email: email, phone: phone, department: department, session: session, role: 'pending' };

            fetch('http://localhost:5000/users', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(saveUser)
            })
              .then(res => res.json())
              .then(data => {
                if (data.insertedId) {
                  setIsSubmitting(true);
                  toast.success('Membership is Pending!');
                  form.reset();
                  logout();

                }
              })
              .then(() => { })
              .catch(error => toast.error(error.message));
          })
          .catch(error => toast.error(error.message));
      })
      .catch(error => toast.error(error.message));

    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <>
      <div className="sm:max-w-xl sm:mx-auto">
        <div className="border-[1px] border-[#136734] bg-white shadow-lg sm:rounded-3xl px-12 md:px-20 py-6">
          <div className="max-w-md mx-auto" data-aos="fade-left" data-aos-easing="ease-out-cubic"
            data-aos-duration="1000">

            <div className="divide-y divide-gray-200">
              <form className="text-base leading-6 space-y-5 text-gray-700 sm:text-lg sm:leading-7" onSubmit={handleRegister}>
                <div className="mb-10 flex flex-col items-center">
                  <img src={logo} alt="" width={50} />
                  <h1 className="text-2xl font-semibold text-center">Apply to RUEC</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      name="name"
                      type="text"
                      className="peer placeholder-transparent h-10  w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Full Name"
                      required />

                    <label
                      htmlFor="name"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Full Name*
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      name="phone"
                      type="number"
                      className="peer placeholder-transparent h-10  w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="+880"
                      required />

                    <label
                      htmlFor="name"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Phone Number*
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      name="department"
                      type="text"
                      className="peer placeholder-transparent h-10  w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Department/Institute"
                      required />

                    <label
                      htmlFor="name"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Department/Institute*
                    </label>
                  </div>


                  <div className="relative">
                    <input
                      name="session"
                      type="text"
                      className="peer placeholder-transparent h-10  w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Session or Year"
                      required />

                    <label
                      htmlFor="session"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Session/Year*
                    </label>
                  </div>
                </div>

                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    className="peer placeholder-transparent h-10  w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Email address"
                    required />

                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                    Email Address*
                  </label>
                </div>

                <div className="relative">
                  <input
                    name="password"
                    type="password"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Password"
                    required />

                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                    Password*
                  </label>
                </div>

                <div className="md:flex md:justify-between items-center text-center  pt-7 pb-5">
                  <div className="relative pb-7">
                    <label className="text-sm absolute -top-5 left-0">Image*</label>
                    <input type="file" name="photo" className="file-input border-[#04431d] file-input-xs max-w-xs" />
                  </div>

                  {isSubmitting ? (
                    <span className="animate-spin">Processing...</span>
                  ) : (
                    <input type="submit" value="Submit" className="px-3 py-1 text-white cursor-pointer bg-[#207f46] hover:bg-[#04431d] hover:scale-95 duration-300 hover:duration-300  rounded" />
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;