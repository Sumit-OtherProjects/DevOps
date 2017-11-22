require 'spec_helper'
describe 'run_checkboxio' do
  context 'with default values for all parameters' do
    it { should contain_class('run_checkboxio') }
  end
end
