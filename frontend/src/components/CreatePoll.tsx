import React, { useState } from 'react';

const CreatePoll: React.FC = () => {
  const [pollName, setPollName] = useState('');
  const [candidates, setCandidates] = useState<string[]>(['']);
  const [votingPeriod, setVotingPeriod] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddCandidate = () => {
    setCandidates([...candidates, '']);
  };

  const handleCandidateChange = (index: number, value: string) => {
    const updatedCandidates = [...candidates];
    updatedCandidates[index] = value;
    setCandidates(updatedCandidates);
  };

  const handleCreatePoll = async () => {
    setLoading(true);
    setError(null);

    try {
      // TO-DO Poll creation logic 
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Poll Created:', { pollName, candidates, votingPeriod });
      setSuccess(true);
    } catch (e) {
      setError('Failed to create poll. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 w-full max-w-5xl mx-auto p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center">Create New Poll</h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Poll Name */}
        <div className="md:col-span-5">
          <input
            type="text"
            className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Poll Name"
            value={pollName}
            onChange={(e) => setPollName(e.target.value)}
          />
        </div>

        {/* Candidates */}
        <div className="md:col-span-5">
          {candidates.map((candidate, index) => (
            <div className="mb-2" key={index}>
              <input
                type="text"
                className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder={`Option ${index + 1}`}
                value={candidate}
                onChange={(e) => handleCandidateChange(index, e.target.value)}
              />
            </div>
          ))}

          {/* Add Candidate Button */}
          <button
            onClick={handleAddCandidate}
            className="mt-2 px-4 py-2 bg-green-500 text-white dark:bg-green-600 rounded-lg hover:bg-green-600 dark:hover:bg-green-700"
          >
            Add Option
          </button>
        </div>

        {/* Voting Period Start */}
        <div className="md:col-span-5">
          <label htmlFor="votingPeriod" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Start Date:
          </label>
          <input
            type="datetime-local"
            className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Voting Period"
            value={votingPeriod}
            onChange={(e) => setVotingPeriod(e.target.value)}
          />
        </div>

        {/* Voting Period End */}
        <div className="md:col-span-5">
          <label htmlFor="votingPeriod" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            End Date:
          </label>
          <input
            type="datetime-local"
            className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Voting Period"
            value={votingPeriod}
            onChange={(e) => setVotingPeriod(e.target.value)}
          />
        </div>

        {/* Create Poll Button */}
        <div className="md:col-span-5">
          <button
            onClick={handleCreatePoll}
            disabled={loading}
            className={`mt-6 w-full md:w-auto px-6 py-3 text-white rounded-lg ${loading ? 'bg-gray-400 cursor-not-allowed dark:bg-gray-500' : 'bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700'}`}
          >
            {loading ? 'Creating Poll...' : 'Create Poll'}
          </button>
        </div>
      </div>

      {/* Success or Error Modal */}
      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-green-600 dark:text-green-400">Poll Created Successfully!</h3>
            <button
              className="mt-4 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded-lg"
              onClick={() => setSuccess(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-red-600 dark:text-red-400">{error}</h3>
            <button
              className="mt-4 px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded-lg"
              onClick={() => setError(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePoll;
