require 'spec_helper'

describe SlashCommands::GlobalSlackHandler, service: true do
  let(:project) { create(:project) }
  let(:user) { create(:user) }
  let(:verification_token) { '123' }

  before do
    stub_application_setting(
      slack_app_verification_token: verification_token
    )
  end

  def enable_slack_application(project)
    create(:gitlab_slack_application_service, project: project)
  end

  def handler(params)
    SlashCommands::GlobalSlackHandler.new(params)
  end

  def handler_with_valid_token(params)
    handler(params.merge(token: verification_token))
  end

  it 'does not serve a request if token is invalid' do
    result = handler(token: '123456', text: 'help').trigger

    expect(result).to be_falsey
  end

  context 'Valid token' do
    it 'calls command handler if project alias is valid' do
      expect_any_instance_of(Gitlab::SlashCommands::Command).to receive(:execute)
      expect_any_instance_of(ChatNames::FindUserService).to receive(:execute).and_return(user)

      enable_slack_application(project)

      slack_integration = create(:slack_integration, service: project.gitlab_slack_application_service)
      slack_integration.update(alias: project.path_with_namespace)

      handler_with_valid_token(
        text: "#{project.path_with_namespace} issue new title",
        team_id: slack_integration.team_id
      ).trigger
    end

    it 'returns error if project alias not found' do
      expect_any_instance_of(Gitlab::SlashCommands::Command).not_to receive(:execute)
      expect_any_instance_of(Gitlab::SlashCommands::Presenters::Error).to receive(:message)

      enable_slack_application(project)

      slack_integration = create(:slack_integration, service: project.gitlab_slack_application_service)

      handler_with_valid_token(
        text: "fake/fake issue new title",
        team_id: slack_integration.team_id
      ).trigger
    end

    it 'returns authorization request' do
      expect_any_instance_of(ChatNames::AuthorizeUserService).to receive(:execute)
      expect_any_instance_of(Gitlab::SlashCommands::Presenters::Access).to receive(:authorize)

      enable_slack_application(project)

      slack_integration = create(:slack_integration, service: project.gitlab_slack_application_service)
      slack_integration.update(alias: project.path_with_namespace)

      handler_with_valid_token(
        text: "#{project.path_with_namespace} issue new title",
        team_id: slack_integration.team_id
      ).trigger
    end

    it 'calls help presenter' do
      expect_any_instance_of(Gitlab::SlashCommands::ApplicationHelp).to receive(:execute)

      handler_with_valid_token(
        text: "help"
      ).trigger
    end
  end
end
