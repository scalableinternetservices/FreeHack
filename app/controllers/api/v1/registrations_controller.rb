module Api::V1
  class RegistrationsController < DeviseTokenAuth::RegistrationsController

    private

      def sign_up_params
        params.require(:user).permit(:name)
      end

      def account_update_params
       params.permit(:name)
      end
      
  end
end
