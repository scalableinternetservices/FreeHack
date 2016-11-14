module Api::V1
  class RegistrationsController < DeviseTokenAuth::RegistrationsController

    private

      def sign_up_params
        params.permit(:email, :password, :password_confirmation, :name)
      end

      def account_update_params
       params.permit(:email, :password, :name)
      end
      
  end
end
